import { type DatabasePerson } from '../../data/model/DatabasePerson'
import type Person from '../entity/Person'

export interface IMemoryDataSource {
  start: () => void
  stop: () => void
  insertPersonRegistry: (person: Person) => Promise<DatabasePerson>
  fetchEveryPersonRegistry: () => Promise<DatabasePerson[]>
  fetchPersonBy: (parameter: string, parameterValue: string) => Promise<Person | null>
  updatePersonBy: (parameter: string, parameterValue: string, personToBeUpdated: Person) => Promise<DatabasePerson | null>
  deletePersonBy: (parameter: string, parameterValue: string) => Promise<DatabasePerson | null>

}
