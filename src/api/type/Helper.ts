import { type JsonWebToken } from '../helper/JsonWebToken'
import { type Email } from './EmailSender'

type Helper = JsonWebToken | Email

export type { Helper }
