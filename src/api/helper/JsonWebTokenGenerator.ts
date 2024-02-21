import * as jsonWebToken from 'jsonwebtoken'
import { type IJsonWebToken } from '../interface/IJsonWebToken'

class JsonWebToken implements IJsonWebToken {
  generate = (id: string, name: string, email: string): string => {
    return jsonWebToken.sign({
      data: { id, name, email }
    }, 'secret', { expiresIn: '10m' })
  }

  verify = (token: string, secret: string): string => {
    return 'a'
  }
}

export { JsonWebToken }
