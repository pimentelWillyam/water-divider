import { type DatabasePerson } from '../model/DatabasePerson'
import type Person from '../../api/entity/Person'

interface IOutOfMemoryDataSource {
  start: () => Promise<void>
  stop: () => Promise<void>
  insertPersonRegistry: (person: Person) => Promise<DatabasePerson>
  fetchEveryPersonRegistry: () => Promise<DatabasePerson[]>
  fetchPersonBy: (parameter: string, parameterValue: string) => Promise<Person | null>
  updatePersonBy: (parameter: string, parameterValue: string, personToBeUpdated: Person) => Promise<DatabasePerson | null>
  deletePersonBy: (parameter: string, parameterValue: string) => Promise<DatabasePerson | null>

}

export type { IOutOfMemoryDataSource }
