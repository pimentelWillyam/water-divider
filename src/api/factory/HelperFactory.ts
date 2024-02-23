import { JsonWebToken } from '../helper/JsonWebToken'
import { type IHelperFactory } from '../interface/IHelperFactory'
import { type Helper } from '../type/Helper'
import { type HelperType } from '../type/HelperType'
import { config } from '../../config'
class HelperFactory implements IHelperFactory {
  fabricate = (helperType: HelperType): Helper => {
    switch (helperType) {
      case 'json web token': return new JsonWebToken(config.jwt)
      default: throw new Error('Tipo de helper inválido')
    }
  }
}

export type { HelperFactory }
