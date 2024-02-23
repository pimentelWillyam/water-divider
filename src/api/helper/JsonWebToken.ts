import * as jsonWebToken from 'jsonwebtoken'
import { type IJsonWebToken } from '../interface/IJsonWebToken'

class JsonWebToken implements IJsonWebToken {
  constructor (private readonly jwtConfig: { secret: string, expiresIn: string }) {}
  generate = (id: string, name: string, email: string): string => {
    return jsonWebToken.sign({
      data: { id, name, email }
    }, this.jwtConfig.secret, { expiresIn: this.jwtConfig.expiresIn })
  }

  verify = (token: string): void => {
    jsonWebToken.verify(token, this.jwtConfig.secret)
  }
}

export { JsonWebToken }
