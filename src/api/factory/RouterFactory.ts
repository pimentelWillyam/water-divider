import { type IRouterFactory } from '../interface/IRouterFactory'
import PersonRouter from '../router/PersonRouter'
import { type DataSource } from '../../data/type/Datasource'
import { type RouterType } from '../type/RouterType'
import { ControllerFactory } from './ControllerFactory'

class RouterFactory implements IRouterFactory {
  private readonly controllerFactory
  constructor (dataSource: DataSource) {
    this.controllerFactory = new ControllerFactory(dataSource)
  }

  fabricate (routerType: RouterType): PersonRouter {
    switch (routerType) {
      case 'person':
        return new PersonRouter(this.controllerFactory.fabricate('person'))

      default:
        throw new Error('Error while creating a router')
    }
  }
}

export { RouterFactory }
