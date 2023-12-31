import PersonController from '../controller/PersonController'
import { type IControllerFactory } from '../interface/IControllerFactory'
import { type IServiceFactory } from '../interface/IServiceFactory'
import { type ControllerType } from '../type/ControllerType'
import { type DataSource } from '../type/Datasource'
import { ServiceFactory } from './ServiceFactory'
import { ValidatorFactory } from './ValidatorFactory'

class ControllerFactory implements IControllerFactory {
  private readonly serviceFactory: IServiceFactory
  private readonly validatorFactory = new ValidatorFactory()
  constructor (dataSource: DataSource) {
    this.serviceFactory = new ServiceFactory(dataSource)
  }

  fabricate (controllerType: ControllerType): PersonController {
    switch (controllerType) {
      case 'person':
        return new PersonController(this.serviceFactory.fabricate('person'), this.validatorFactory.fabricate('person'))
      default:
        throw new Error('Error when creating controller')
    }
  }
}

export { ControllerFactory }
