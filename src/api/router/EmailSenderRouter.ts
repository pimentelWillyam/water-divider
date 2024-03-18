// importando core da rota
import * as express from 'express'
import { type Router, type Request, type Response } from 'express'

// importando service da rota
import { type IAuthenticationMiddleware } from '../type/IAuthenticationMiddleware'
import type IEmailSenderController from '../interface/IEmailSenderController'
import type IEmailSenderRouter from '../interface/IEmailSenderRouter'

// criando rotas

class EmailSenderRouter implements IEmailSenderRouter {
  readonly routes: Router
  constructor (readonly authenticationMiddleware: IAuthenticationMiddleware, readonly emailSenderController: IEmailSenderController) {
    this.routes = express.Router()
    this.routes.post('/password-change', this.authenticationMiddleware.authenticateToken.bind(this.authenticationMiddleware), (req: Request, res: Response) => { void this.emailSenderController.sendPasswordChangeEmail(req, res) })
  }
}

export default EmailSenderRouter
