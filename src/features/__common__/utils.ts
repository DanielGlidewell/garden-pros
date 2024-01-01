import { Err } from "./fun.ts";

export function transformUnkToErr(e: unknown): Err {
  if(e instanceof Error) {
    console.error('Failed to create user:', e)
    return { kind: 'err', error: e }
  } else if (typeof e == 'string') {
    console.error('Failed to create user:', e)
    return { kind: 'err', error: new Error(e) }
  } else {
    console.error('Failed to create user:', e)
    return { kind: 'err', error: new Error('Unknown error') }
  }
}