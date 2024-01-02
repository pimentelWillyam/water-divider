import type Person from '../entity/Person'
import { type DataSource } from '../type/Datasource'

interface IPersonRepository {
  readonly dataSource: DataSource

  create: (id: string, name: string, email: string, age: number) => Promise<Person>
  getAll: () => Promise<Person[]>
  get: (id: string) => Promise<Person | null>
  update: (id: string, name: string, email: string, age: number) => Promise<Person | null>
  delete: (id: string) => Promise<Person | null>

}

export default IPersonRepository
