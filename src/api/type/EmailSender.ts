import { createTransport } from 'nodemailer'
import { type IEmail } from '../interface/IEmail'
import { type EmailConfig } from './EmailConfig'

class Email implements IEmail {
  constructor (private readonly emailConfig: EmailConfig) {}
  async send (destiny: string, title: string, message: string): Promise<void> {
    const transporter = createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: this.emailConfig.login,
        pass: this.emailConfig.password
      }
    })
    try {
      await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
        to: destiny, // list of receivers
        subject: title,
        text: message
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export { Email }
