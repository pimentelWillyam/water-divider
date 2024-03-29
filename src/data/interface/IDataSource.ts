import { type DatabasePerson } from '../model/DatabasePerson'
import type Person from '../../api/entity/Person'

interface IDataSource {
  start: () => Promise<void>
  stop: () => Promise<void>
  insertPersonRegistry: (person: Person) => Promise<DatabasePerson>
  fetchEveryPersonRegistry: () => Promise<DatabasePerson[]>
  fetchPersonRegistryBy: (parameter: string, parameterValue: string) => Promise<Person | null>
  updatePersonRegistryBy: (parameter: string, parameterValue: string, personToBeUpdated: Person) => Promise<DatabasePerson | null>
  deletePersonRegistryBy: (parameter: string, parameterValue: string) => Promise<DatabasePerson | null>

}

export type { IDataSource }
