import { ErrorFactory } from '../factory/ErrorFactory'
import { JsonWebToken } from '../helper/JsonWebToken'
import { type IErrorFactory } from '../interface/IErrorFactory'
import { type IJsonWebToken } from '../interface/IJsonWebToken'
import { type IAuthenticationMiddleware } from '../type/IAuthenticationMiddleware'
import { type NextFunction, type Request, type Response } from 'express'
import { config } from '../../config'
class AuthenticationMiddleware implements IAuthenticationMiddleware {
  readonly errorFactory: IErrorFactory
  readonly jsonWebToken: IJsonWebToken
  constructor (jsonWebToken: IJsonWebToken, errorFactory: IErrorFactory) {
    this.jsonWebToken = jsonWebToken
    this.errorFactory = errorFactory
  }

  authenticateToken (req: Request, res: Response, nextFunction: NextFunction): void {
    const jsonWebToken = new JsonWebToken(config.jwt)
    const errorFactory = new ErrorFactory()
    const token = req.headers.bearer?.slice(7, req.headers.bearer.length)
    console.log(token)
    if (token === undefined || typeof token !== 'string') throw errorFactory.create('invalid token')
    jsonWebToken.verify(token)
    nextFunction()
  }
}

export { AuthenticationMiddleware }
