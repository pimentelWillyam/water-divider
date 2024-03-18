import type IEmailSenderService from '../interface/IEmailSenderService'
import { type IEmail } from '../interface/IEmail'
import type Person from '../entity/Person'

class EmailSenderService implements IEmailSenderService {
  constructor (readonly email: IEmail) {}

  async sendPasswordChangeEmail (person: Person): Promise<void> {
    this.email.send(person.email, 'Troca de senha', `Para trocar a sua senha utilize a seguinte rota: localhost:4000/api/person/${person.id} utilizando o verbo PATCH. Para tal, use o Insomnia ou algum cliente de requisições de seu gosto.
    
    O formato da requisição deve ser: 
    {
      "password": "SuaNovaSenha"
    }`)
  }
}

export default EmailSenderService
