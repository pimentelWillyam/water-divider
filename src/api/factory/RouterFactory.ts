import { type IRouterFactory } from '../interface/IRouterFactory'
import PersonRouter from '../router/PersonRouter'
import { type DataSource } from '../../data/type/Datasource'
import { type RouterType } from '../type/RouterType'
import { ControllerFactory } from './ControllerFactory'
import AuthRouter from '../router/AuthRouter'
import { type Router } from '../type/Router'
import type PersonController from '../controller/PersonController'
import { type AuthController } from '../controller/AuthController'
import { AuthenticationMiddleware } from '../middleware/AuthenticationMiddleware'
import { JsonWebToken } from '../helper/JsonWebToken'

import { config } from '../../config'
import { ErrorFactory } from './ErrorFactory'
import type EmailSenderController from '../controller/EmailSenderController'
import EmailSenderRouter from '../router/EmailSenderRouter'

class RouterFactory implements IRouterFactory {
  private readonly controllerFactory
  constructor (dataSource: DataSource) {
    this.controllerFactory = new ControllerFactory(dataSource)
  }

  fabricate (routerType: RouterType): Router {
    switch (routerType) {
      case 'person':
        return new PersonRouter(new AuthenticationMiddleware(new JsonWebToken(config.jwt), new ErrorFactory()), this.controllerFactory.fabricate('person') as PersonController)
      case 'auth':
        return new AuthRouter(this.controllerFactory.fabricate('auth') as AuthController)

      case 'email sender':
        return new EmailSenderRouter(new AuthenticationMiddleware(new JsonWebToken(config.jwt), new ErrorFactory()), this.controllerFactory.fabricate('email sender') as EmailSenderController)

      default:
        throw new Error('Error while creating a router')
    }
  }
}

export { RouterFactory }
