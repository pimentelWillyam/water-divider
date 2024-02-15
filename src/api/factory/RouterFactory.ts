import { type IRouterFactory } from '../interface/IRouterFactory'
import PersonRouter from '../router/PersonRouter'
import { type DataSource } from '../../data/type/Datasource'
import { type RouterType } from '../type/RouterType'
import { ControllerFactory } from './ControllerFactory'
import AuthRouter from '../router/AuthRouter'
import { type Router } from '../type/Router'
import type PersonController from '../controller/PersonController'
import { type AuthController } from '../controller/AuthController'

class RouterFactory implements IRouterFactory {
  private readonly controllerFactory
  constructor (dataSource: DataSource) {
    this.controllerFactory = new ControllerFactory(dataSource)
  }

  fabricate (routerType: RouterType): Router {
    switch (routerType) {
      case 'person':
        return new PersonRouter(this.controllerFactory.fabricate('person') as PersonController)
      case 'auth':
        return new AuthRouter(this.controllerFactory.fabricate('auth') as AuthController)

      default:
        throw new Error('Error while creating a router')
    }
  }
}

export { RouterFactory }
