import { Result } from "../__common__/fun.ts"

// ------------------
// | External Types |
// ------------------

// -- User Types --
export type User = {
  id: number
  personalInfo: PersonalInfo
  roles: SystemRole[]
}

export type NewUser = {
  personalInfo: PersonalInfo
  roles: SystemRole[]
  identification: {
    type: IdentityType
    identifier: string
    credential: string
  }
}

// deno-lint-ignore no-explicit-any
export function isNewUser(value: any): value is NewUser {
  const errors: string[] = []

  if (typeof value != 'object') {
    errors.push('Not an object')
  }
  
  if (value.personalInfo == undefined) {
    errors.push('Missing personalInfo')
  }

  if (!isPersonalInfo(value.personalInfo)) {
    errors.push('Invalid personalInfo')
  }

  if (value.roles == undefined) {
    errors.push('Missing roles')
  }

  if (!Array.isArray(value.roles)) {
    errors.push('Invalid roles')
  }

  if (!value.roles.every(isSystemRole)) {
    errors.push('Invalid roles')
  }

  if (value.identification == undefined) {
    errors.push('Missing identification')
  }

  if (!isIdentityType(value.identification.type)) {
    errors.push('Invalid identification type')
  }

  if (typeof value.identification.identifier != 'string') {
    errors.push('Invalid identification identifier')
  }

  if (typeof value.identification.credential != 'string') {
    errors.push('Invalid identification credential')
  }

  if (errors.length > 0) {
    console.log(errors)
    return false
  }
  return true
}


// -- Function Types --
export type BulkUsersGetter = () => Promise<Result<User[]>>

export type UserCreator = (newUser: NewUser) => Promise<Result<User>>



// ------------------
// | Internal Types |
// ------------------

// -- Personal Info --
type PersonalInfo = {
  firstName: string
  middleName: string | null
  lastName: string
  communicationEmail: string
}

// deno-lint-ignore no-explicit-any
function isPersonalInfo(value: any): value is PersonalInfo {
  const errors: string[] = []

  if (value == undefined) {
    errors.push('Missing personalInfo')
  }

  if (typeof value != 'object') {
    errors.push('Invalid personalInfo')
  }

  if (value.firstName == undefined) {
    errors.push('Missing firstName')
  }

  if (typeof value.firstName != 'string') {
    errors.push('Invalid firstName')
  }

  if (value.lastName == undefined) {
    errors.push('Missing last name')
  }

  if (typeof value.lastName != 'string') {
    errors.push('Invalid last name')
  }

  if (value.communicationEmail == undefined) {
    errors.push('Missing communication email')
  }

  if (typeof value.communicationEmail != 'string') {
    errors.push('Invalid communication email')
  }

  if (errors.length > 0) {
    console.log(errors)
    return false
  }

  return true
}


// -- Identity Types --
const IdentityTypes = ['password', 'facebook', 'google'] as const

type IdentityType = typeof IdentityTypes[number]

// deno-lint-ignore no-explicit-any
function isIdentityType(value: any): value is IdentityType {
  return typeof value == 'string'
    && IdentityTypes.includes(value as IdentityType) // Necessary to make compiler happy, but safe because of the type guard
}


// -- System Roles --
const SystemRoles = ['Admin', 'Manager', 'Crew Leader', 'Technician', 'Customer'] as const

type SystemRole = typeof SystemRoles[number]

// deno-lint-ignore no-explicit-any
function isSystemRole(value: any): value is SystemRole {
  return typeof value == 'string'
    && SystemRoles.includes(value as SystemRole) // Necessary to make compiler happy, but safe because of the type guard
}
