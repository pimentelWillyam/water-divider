import { createTransport } from 'nodemailer'
import { type IEmail } from '../interface/IEmail'

class Email implements IEmail {
  async send (destiny: string, title: string, message: string): Promise<void> {
    const transporter = createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '5a6a4af2656fed',
        pass: '********2646'
      }
    })

    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to: destiny, // list of receivers
      subject: title,
      text: message
    })
    console.log(info)
  }
}

export { Email }
