import * as jsonWebToken from 'jsonwebtoken'
import { type IJsonWebTokenGenerator } from '../interface/IJsonWebTokenGenerator'

class JsonWebTokenGenerator implements IJsonWebTokenGenerator {
  generate = (id: string, name: string, email: string): string => {
    return jsonWebToken.sign({
      data: { id, name, email }
    }, 'secret', { expiresIn: '10m' })
  }
}

export { JsonWebTokenGenerator }
