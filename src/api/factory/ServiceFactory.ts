import { type IRepositoryFactory } from '../interface/IRepositoryFactory'
import { type IServiceFactory } from '../interface/IServiceFactory'
import PersonService from '../service/PersonService'
import { type DataSource } from '../../data/type/Datasource'
import { type Service } from '../type/Service'
import { type ServiceType } from '../type/ServiceType'
import { NameNormalizerFactory } from './NameNormalizerFactory'
import { RepositoryFactory } from './RepositoyFactory'
import { UUIDGeneratorFactory } from './UUIDGeneratorFactory'
import AuthService from '../service/AuthService'
import { JsonWebToken } from '../helper/JsonWebToken'
import { ErrorFactory } from './ErrorFactory'
import { Email } from '../type/Email'
import { config } from '../../config'

class ServiceFactory implements IServiceFactory {
  private readonly uuidGeneratorFactory = new UUIDGeneratorFactory()
  private readonly nameNormalizerFactory = new NameNormalizerFactory()
  private readonly repositoryFactory: IRepositoryFactory
  private readonly errorFactory = new ErrorFactory()
  constructor (dataSource: DataSource) {
    this.repositoryFactory = new RepositoryFactory(dataSource)
  }

  fabricate (serviceType: ServiceType): Service {
    switch (serviceType) {
      case 'person':
        return new PersonService(this.repositoryFactory.fabricate('person'), this.uuidGeneratorFactory.fabricate(), this.nameNormalizerFactory.fabricate())
      case 'auth':
        return new AuthService(this.errorFactory, this.repositoryFactory.fabricate('person'), new JsonWebToken(config.jwt), new Email(config.email))

      case 'email sender':
        return new AuthService(this.errorFactory, this.repositoryFactory.fabricate('email sender'), new JsonWebToken(config.jwt), new Email(config.email))

      default:
        throw new Error('Error at validator fabrication')
    }
  }
}

export { ServiceFactory }
