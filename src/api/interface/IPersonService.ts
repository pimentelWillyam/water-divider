import type Person from '../entity/Person'

interface IPersonService {
  create: (name: string, email: string, age: number) => Person
  getAll: () => Person[]
  get: (id: string) => Person | null
  update: (id: string, personToBeUpdated: Person) => Person | null
  delete: (id: string) => Person | null


}

export default IPersonService
