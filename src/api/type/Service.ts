import type AuthService from '../service/AuthService'
import type EmailSenderService from '../service/EmailSenderService'
import type PersonService from '../service/PersonService'

type Service = PersonService | AuthService | EmailSenderService

export type { Service }
