import { HelperFactory } from '../factory/HelperFactory'
import { type Email } from '../type/Email'
import EmailSenderService from './EmailSenderService'

test.skip('Email deve ser enviado sem erros', async () => {
  const helperFactory = new HelperFactory()
  const emailSender = new EmailSenderService(helperFactory.fabricate('email') as Email)
  const result = emailSender.sendPasswordChangeEmail({ id: 'some id', email: 'email@email.com', password: 'some password', age: 33, name: 'some name' })
  console.log(result.then())
  expect(result.then()).toBe(null)
})
