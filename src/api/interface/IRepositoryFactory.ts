import { type Repository } from '../type/Repository'
import { type RepositoryType } from '../type/RepositoryType'

interface IRepositoryFactory {
  fabricate: (repositoryType: RepositoryType) => Repository
}

export type { IRepositoryFactory }
