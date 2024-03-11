import { JsonWebToken } from '../helper/JsonWebToken'
import { type IHelperFactory } from '../interface/IHelperFactory'
import { type Helper } from '../type/Helper'
import { type HelperType } from '../type/HelperType'
import { config } from '../../config'
import { Email } from '../type/EmailSender'

class HelperFactory implements IHelperFactory {
  fabricate = (helperType: HelperType): Helper => {
    switch (helperType) {
      case 'json web token': return new JsonWebToken(config.jwt)
      case 'email': return new Email(config.email)

      default: throw new Error('Tipo de helper inválido')
    }
  }
}

export { HelperFactory }
