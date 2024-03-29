import PersonController from '../controller/PersonController'
import { type IControllerFactory } from '../interface/IControllerFactory'
import { type IServiceFactory } from '../interface/IServiceFactory'
import { type ControllerType } from '../type/ControllerType'
import { type DataSource } from '../../data/type/Datasource'
import { ServiceFactory } from './ServiceFactory'
import { ValidatorFactory } from './ValidatorFactory'
import { type Controller } from '../type/Controller'
import { AuthController } from '../controller/AuthController'
import type AuthService from '../service/AuthService'
import type PersonService from '../service/PersonService'
import type PersonValidator from '../validator/PersonValidator'
import type AuthValidator from '../validator/AuthValidator'
import EmailSenderController from '../controller/EmailSenderController'
import type EmailSenderService from '../service/EmailSenderService'

class ControllerFactory implements IControllerFactory {
  private readonly serviceFactory: IServiceFactory
  private readonly validatorFactory = new ValidatorFactory()
  constructor (dataSource: DataSource) {
    this.serviceFactory = new ServiceFactory(dataSource)
  }

  fabricate (controllerType: ControllerType): Controller {
    switch (controllerType) {
      case 'person':
        return new PersonController(this.serviceFactory.fabricate('person') as PersonService, this.validatorFactory.fabricate('person', this.serviceFactory.fabricate('person')) as PersonValidator)
      case 'auth':
        return new AuthController(this.serviceFactory.fabricate('auth') as AuthService, this.validatorFactory.fabricate('auth', this.serviceFactory.fabricate('person')) as AuthValidator)
      case 'email sender':
        return new EmailSenderController(this.serviceFactory.fabricate('email sender') as EmailSenderService, this.serviceFactory.fabricate('person') as PersonService)

      default:
        throw new Error('Error when creating controller')
    }
  }
}

export { ControllerFactory }
