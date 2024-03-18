import type Person from '../entity/Person'
import { type IEmail } from './IEmail'


interface IEmailSenderService {
  readonly email: IEmail

  sendPasswordChangeEmail: (person: Person) => Promise<void>
}

export default IEmailSenderService
