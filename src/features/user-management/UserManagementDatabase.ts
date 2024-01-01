import { Database } from "https://deno.land/x/sqlite3@0.10.0/mod.ts"
import config from "../../config.ts"
import { migrateDatabase, Query, sql } from "../__common__/db-utils.ts";

const dbName = 'Users.sqlite3'
const dbPath = `${config.db_dir}/${dbName}`

export function connectToUserDb() {
  return new Database(dbPath)
}

export function migrateUserDatabase() {
  const db = connectToUserDb()
  migrateDatabase(db, schema)
}

const schema: Query[] = [
  sql`
    CREATE TABLE IF NOT EXISTS User (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      firstName TEXT NOT NULL,
      middleName TEXT,
      lastName TEXT NOT NULL,
      email TEXT NOT NULL
    )
  `,
  sql`
    CREATE TABLE IF NOT EXISTS UserIdentification (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      type TEXT NOT NULL,
      identifier TEXT NOT NULL,
      credential TEXT,
      FOREIGN KEY(userId) REFERENCES User(id)
  )`,
  sql`
    CREATE TABLE IF NOT EXISTS SystemRole (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )
  `,
  sql`
    INSERT INTO SystemRole (name) VALUES 
      ('Admin'),
      ('Manager'),
      ('Crew Leader'),
      ('Technician'),
      ('Customer')
  `,
  sql`
    CREATE TABLE IF NOT EXISTS UserSystemRole (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      roleId INTEGER NOT NULL,
      FOREIGN KEY (userId) REFERENCES User (id),
      FOREIGN KEY (roleId) REFERENCES SystemRole (id)
    )
  `
]
