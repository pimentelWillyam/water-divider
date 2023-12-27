import type IPersonRepository from '../interface/IPersonRepository'
import type { IMemoryDataSource } from '../interface/IMemoryDataSource'
import type Person from '../entity/Person'

class PersonRepository implements IPersonRepository {
  constructor (readonly dataSource: IMemoryDataSource) {}

  create (id: string, name: string, email: string, age: number): Person {
    this.dataSource.insertPersonRegistry(id, name, email, age)
    return { id, name, email, age }
  }

  getAll (): Person[] {
    return this.dataSource.fetchEveryPersonRegistry()
  }

  get (id: string): Person | null {
    return this.dataSource.fetchPersonRegistry(id)
  }

  update (id: string, name: string, email: string, age: number): Person | null {
    return this.dataSource.updatePersonRegistry(id, {id, name, email, age})
  }

  delete (id: string): Person | null {
    return this.dataSource.deletePersonRegistry(id)
  }
}

export default PersonRepository
