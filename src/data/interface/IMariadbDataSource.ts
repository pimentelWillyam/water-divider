import type Person from '../../api/entity/Person'
import { type DatabasePerson } from '../model/DatabasePerson'

interface IMariadbDataSource {
  start: () => void
  stop: () => void
  insertPersonRegistry: (person: Person) => Promise<DatabasePerson>
  fetchEveryPersonRegistry: () => Promise<DatabasePerson[]>
  fetchPersonBy: (parameter: string, parameterValue: string) => Promise<Person | null>
  updatePersonBy: (parameter: string, parameterValue: string, personToBeUpdated: Person) => Promise<DatabasePerson | null>
  deletePersonBy: (parameter: string, parameterValue: string) => Promise<DatabasePerson | null>
}

export { type IMariadbDataSource }
