import type Person from '../entity/Person'
import { type DataSource } from '../../data/type/Datasource'

interface IPersonRepository {
  readonly dataSource: DataSource

  create: (id: string, password: string, name: string, email: string, age: number) => Promise<Person>
  getAll: () => Promise<Person[]>
  get: (id: string) => Promise<Person | null>
  getByEmail: (email: string) => Promise<Person | null>
  update: (id: string, password: string, name: string, email: string, age: number) => Promise<Person | null>
  delete: (id: string) => Promise<Person | null>

}

export default IPersonRepository
