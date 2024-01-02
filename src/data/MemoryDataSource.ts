import type Person from '../api/entity/Person'
import { type IMemoryDataSource } from '../api/interface/IMemoryDataSource'
import { type DatabasePerson } from './model/DatabasePerson'

class MemoryDataSource implements IMemoryDataSource {
  private personList: Person[] = []

  readonly start = (): void => {
    this.createPersonTable()
  }

  readonly stop = (): void => {
    this.createPersonTable()
  }

  readonly createPersonTable = (): void => {
    this.personList = []
  }

  readonly dropPersonTable = (): void => {
    this.personList = []
  }

  insertPersonRegistry = async (person: Person): Promise<DatabasePerson> => {
    this.personList.push(person)
    return person
  }

  fetchEveryPersonRegistry = async (): Promise<DatabasePerson[]> => {
    return this.personList
  }

  fetchPersonBy = async (parameter: string, parameterValue: string): Promise<DatabasePerson | null> => {
    for (const person of this.personList) {
      if (parameter === 'id') if (person.id === parameterValue) return person
    }
    return null
  }

  updatePersonBy = async (parameter: string, parameterValue: string, personToBeUpdated: Person): Promise<DatabasePerson | null> => {
    const person = await this.fetchPersonBy('id', parameterValue)
    if (person === null) return null
    if (personToBeUpdated.name !== undefined) person.name = personToBeUpdated.name
    if (personToBeUpdated.email !== undefined) person.email = personToBeUpdated.email
    if (personToBeUpdated.age !== undefined) person.age = personToBeUpdated.age
    return person
  }

  deletePersonBy = async (id: string): Promise<DatabasePerson | null> => {
    for (let i = 0; i < this.personList.length; i++) {
      if (this.personList[i].id === id) {
        const person = this.personList[i]
        this.personList.splice(i, 1)
        return person
      }
    }
    return null
  }
}

export default MemoryDataSource
