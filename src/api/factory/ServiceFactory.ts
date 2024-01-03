import { type IRepositoryFactory } from '../interface/IRepositoryFactory'
import { type IServiceFactory } from '../interface/IServiceFactory'
import PersonService from '../service/PersonService'
import { type DataSource } from '../../data/type/Datasource'
import { type Service } from '../type/Service'
import { type ServiceType } from '../type/ServiceType'
import { NameNormalizerFactory } from './NameNormalizerFactory'
import { RepositoryFactory } from './RepositoyFactory'
import { UUIDGeneratorFactory } from './UUIDGeneratorFactory'

class ServiceFactory implements IServiceFactory {
  private readonly uuidGeneratorFactory = new UUIDGeneratorFactory()
  private readonly nameNormalizerFactory = new NameNormalizerFactory()
  private readonly repositoryFactory: IRepositoryFactory
  constructor (dataSource: DataSource) {
    this.repositoryFactory = new RepositoryFactory(dataSource)
  }

  fabricate (serviceType: ServiceType): Service {
    switch (serviceType) {
      case 'person':
        return new PersonService(this.repositoryFactory.fabricate('person'), this.uuidGeneratorFactory.fabricate(), this.nameNormalizerFactory.fabricate())

      default:
        throw new Error('Error at validator fabrication')
    }
  }
}

export { ServiceFactory }
