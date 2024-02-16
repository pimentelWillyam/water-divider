import type AuthService from '../service/AuthService'
import type PersonService from '../service/PersonService'

type Service = PersonService | AuthService

export type { Service }
