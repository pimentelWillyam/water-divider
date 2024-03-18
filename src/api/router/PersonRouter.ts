// importando core da rota
import * as express from 'express'
import { type Router, type Request, type Response } from 'express'

// importando service da rota
import type IPersonController from '../interface/IPersonController'
import type IPersonRouter from '../interface/IPersonRouter'
import { type IAuthenticationMiddleware } from '../type/IAuthenticationMiddleware'

// criando rotas

class PersonRouter implements IPersonRouter {
  readonly routes: Router
  constructor (readonly authenticationMiddleware: IAuthenticationMiddleware, readonly personController: IPersonController) {
    this.routes = express.Router()
    this.routes.post('/person', this.authenticationMiddleware.authenticateToken.bind(this.authenticationMiddleware), (req: Request, res: Response) => { void this.personController.create(req, res) })
    this.routes.get('/person', this.authenticationMiddleware.authenticateToken.bind(this.authenticationMiddleware), (req: Request, res: Response) => { void this.personController.getAll(res) })
    this.routes.get('/person/:id', this.authenticationMiddleware.authenticateToken.bind(this.authenticationMiddleware), (req: Request, res: Response) => { void this.personController.get(req, res) })
    this.routes.put('/person/:id', this.authenticationMiddleware.authenticateToken.bind(this.authenticationMiddleware), (req: Request, res: Response) => { void this.personController.update(req, res) })
    this.routes.patch('/person/:id', this.authenticationMiddleware.authenticateToken.bind(this.authenticationMiddleware), (req: Request, res: Response) => { void this.personController.patch(req, res) })
    this.routes.delete('/person/:id', this.authenticationMiddleware.authenticateToken.bind(this.authenticationMiddleware), (req: Request, res: Response) => { void this.personController.delete(req, res) })
  }
}

export default PersonRouter
