import { sql } from "../__common__/db-utils.ts";
import { Result } from "../__common__/fun.ts";
import { transformUnkToErr } from "../__common__/utils.ts";
import { connectToUserDb } from "./UserManagementDatabase.ts";
import { NewUser, User } from "./UserManagementDomain.ts";

export const UserService = {
  getUsers,
  createUser
}

function getUsers(): Result<User[]> {
  const db = connectToUserDb();
  const getUsersQuery = sql`
    SELECT 
      User.id, 
      User.firstName, 
      User.middleName, 
      User.lastName, 
      User.email,
      '[' || GROUP_CONCAT('"' || SystemRole.name || '"') || ']'  AS roles
    FROM 
      User
      JOIN UserSystemRole ON User.id = UserSystemRole.userId
      JOIN SystemRole     ON UserSystemRole.roleId = SystemRole.id
    GROUP BY 
      User.id;
  `;

  try {
    const result = db.prepare(getUsersQuery.sql).all(getUsersQuery.parameters);
    const users = result.map(function resultToUser(row: any) {
      return {
        id: row.id,
        personalInfo: {
          firstName: row.firstName,
          middleName: row.middleName,
          lastName: row.lastName,
          communicationEmail: row.email
        },
        roles: JSON.parse(row.roles)
      };
    });

    return {
      kind: 'ok',
      value: users
    };
  } catch (error) {
    return transformUnkToErr(error);
  } finally {
    db.close();
  }
}

function createUser(user: NewUser): Result<User> {
  const db = connectToUserDb();
  const info = user.personalInfo;
  const identity = getIdentity(user);
  const roles = user.roles;

  try {
    // Build db transaction
    const trx = db.transaction(() => {
      
      // Create new user
      const queryNewUser = sql`
        INSERT INTO User (firstName, middleName, lastName, email)
        VALUES (${info.firstName}, ${info.middleName}, ${info.lastName}, ${info.communicationEmail.toString()})
      `;
      db.prepare(queryNewUser.sql).run(queryNewUser.parameters);
      const newUserId = db.lastInsertRowId;


      // Create new user identification based on how they chose to authenticate
      const queryNewUserIdentification = sql`
        INSERT INTO UserIdentification (userId, type, identifier, credential)
        VALUES (${newUserId}, ${identity.type}, ${identity.identifier}, ${identity.credential})
      `;
      db.prepare(queryNewUserIdentification.sql).run(queryNewUserIdentification.parameters);


      // Create new user system roles
      roles.forEach((role) => {
        const queryNewUserRole = sql`
          INSERT INTO UserSystemRole (userId, roleId)
          VALUES (${newUserId}, (SELECT id FROM SystemRole WHERE name = ${role}))
        `;
        db.prepare(queryNewUserRole.sql).run(queryNewUserRole.parameters);
      });


      // Return new user
      return {
        id: newUserId,
        personalInfo: user.personalInfo,
        roles: user.roles
      };
    });

    // Execute transaction
    const newUser = trx();

    return { 
      kind: 'ok', 
      value: newUser 
    };
  } catch (error) {
    return transformUnkToErr(error);
  } finally {
    db.close();
  };
}

function getIdentity(newUser: NewUser) {
  const id = newUser.identification;
  const identifier = id.identifier == 'first_initial_last_name_scheme' ? 
    `${newUser.personalInfo.firstName[0]}${newUser.personalInfo.lastName}` : 
    id.identifier;

  return {
    type: id.type,
    identifier: identifier,
    credential: id.credential
  };
}
