import { type Request, type Response } from 'express'

import type IAuthController from '../interface/IAuthController'
import type IAuthService from '../interface/IAuthService'
import KnownError from '../validator/errors/KnownError'
import type IAuthValidator from '../interface/IAuthValidator'

class AuthController implements IAuthController {
  constructor (readonly authService: IAuthService, readonly authValidator: IAuthValidator) {}

  async authenticate (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const errorList = await this.authValidator.validateAuthentication(req.body.login, req.body.password)
      if (errorList.length !== 0) return res.status(400).json({ errorList })
      const auth = await this.authService.authenticate(req.body.login)
      return res.status(200).json(auth)
    } catch (error) {
      console.error(error)
      if (error instanceof KnownError) {
        return res.status(error.status).send({ name: error.name, message: error.message })
      }

      return res.status(500).send({ name: 'Erro desconhecido', message: 'Um erro inesperado aconteceu durante a requisição' })
    }
  }
}

export { AuthController }
