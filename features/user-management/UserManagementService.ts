import { Result } from "../__common__/fun.ts";
import { BulkUsersGetter, User } from "./UserManagementDomain.ts";

export const UserService: UserService = {
  getUsers,
}

const fakeUsers: User[] = [
  {
    id: 1,
    personalInfo: {
      firstName: 'Aragorn',
      middleName: 'Elessar',
      lastName: 'Arathornson',
      communicationEmail: 'theking@gondor.com'
    },
    roles: ['Admin']
  },
  {
    id: 2,
    personalInfo: {
      firstName: 'Gandalf',
      middleName: null,
      lastName: 'The Grey',
      communicationEmail: 'thewanderer@middleearth.org'
    },
    roles: ['Manager']
  },
  {
    id: 3,
    personalInfo: {
      firstName: 'Frodo',
      middleName: null,
      lastName: 'Baggins',
      communicationEmail: 'fbaggins@bagend.com'
    },
    roles: ['Crew Leader']
  }
]

// Using fakeUsers for now
function getUsers(): Promise<Result<User[]>> {
  return Promise.resolve({
    kind: 'ok',
    value: fakeUsers
  })
}

type UserService = {
  getUsers: BulkUsersGetter,
}