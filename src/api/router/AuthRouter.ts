// importando core da rota
import * as express from 'express'
import { type Router, type Request, type Response } from 'express'

// importando service da rota
import type IAuthController from '../interface/IAuthController'
import type IAuthRouter from '../interface/IAuthRouter'

// criando rotas

class AuthRouter implements IAuthRouter {
  readonly routes: Router
  constructor (readonly authController: IAuthController) {
    this.routes = express.Router()
    this.routes.post('/auth', (req: Request, res: Response) => {
      void authController.authenticate(req, res)
    })
  }
}

export default AuthRouter
