import type Person from '../entity/Person'

export interface IMemoryDataSource {
  start: () => void
  createPersonTable: () => void
  insertPersonRegistry: (id: string, name: string, email: string, age: number) => Person
  fetchEveryPersonRegistry: () => Person[]
  fetchPersonRegistry: (id: string) => Person | null
  updatePersonRegistry: (id: string, personToBeUpdated: Person) => Person | null
  deletePersonRegistry: (id: string) => Person | null

  

}
