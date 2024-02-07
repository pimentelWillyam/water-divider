import { type Request, type Response } from 'express'
import type IAuthService from './IAuthService'

interface IAuthController {
  readonly authService: IAuthService

  authenticate: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>
}

export default IAuthController
