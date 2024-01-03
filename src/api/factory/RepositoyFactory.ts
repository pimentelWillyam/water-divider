import { type IRepositoryFactory } from '../interface/IRepositoryFactory'
import PersonRepository from '../repository/PersonRepository'
import { type DataSource } from '../../data/type/Datasource'

class RepositoryFactory implements IRepositoryFactory {
  constructor (private readonly dataSource: DataSource) {}
  fabricate (repositoryType: 'person'): PersonRepository {
    switch (repositoryType) {
      case 'person':
        return new PersonRepository(this.dataSource)

      default:
        throw new Error('Invalid repository type')
    }
  }
}

export { RepositoryFactory }
