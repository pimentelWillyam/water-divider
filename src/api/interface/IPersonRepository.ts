import type Person from '../entity/Person'
import type { IMemoryDataSource } from './IMemoryDataSource'

interface IPersonRepository {
  readonly dataSource: IMemoryDataSource

  create: (id: string, name: string, email: string, age: number) => Person
  getAll: () => Person[]
  get: (id: string) => Person | null
  update: (id: string, name: string, email: string, age: number) => Person | null
  delete: (id: string) => Person | null

}

export default IPersonRepository
