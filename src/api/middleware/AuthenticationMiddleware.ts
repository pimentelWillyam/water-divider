import { type IErrorFactory } from '../interface/IErrorFactory'
import { type IJsonWebToken } from '../interface/IJsonWebToken'
import { type IAuthenticationMiddleware } from '../type/IAuthenticationMiddleware'
import { type NextFunction, type Request, type Response } from 'express'
class AuthenticationMiddleware implements IAuthenticationMiddleware {
  constructor (readonly jsonWebToken: IJsonWebToken, readonly errorFactory: IErrorFactory) {}

  authenticateToken (req: Request, res: Response, nextFunction: NextFunction): void {
    const token = req.headers.bearer?.slice(7, req.headers.bearer.length)
    if (token === undefined || typeof token !== 'string') throw this.errorFactory.create('invalid age')
    this.jsonWebToken.verify(token)
    nextFunction()
  }
}

export { AuthenticationMiddleware }
