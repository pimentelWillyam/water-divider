import type Person from '../api/entity/Person'
import { type IDataSource } from './interface/IDataSource'

class MemoryDataSource implements IDataSource {
  private personList: Person[] = []

  readonly start = async (): Promise<void> => {
    await this.createPersonTable()
  }

  readonly stop = async (): Promise<void> => {
    await this.createPersonTable()
  }

  readonly createPersonTable = async (): Promise<void> => {
    this.personList = []
  }

  readonly dropPersonTable = async (): Promise<void> => {
    this.personList = []
  }

  insertPersonRegistry = async (person: Person): Promise<Person> => {
    this.personList.push(person)
    return person
  }

  fetchEveryPersonRegistry = async (): Promise<Person[]> => {
    return this.personList
  }

  fetchPersonRegistryBy = async (parameter: string, parameterValue: string): Promise<Person | null> => {
    for (const person of this.personList) {
      if (parameter === 'id' && person.id === parameterValue) return person
      else if (parameter === 'email' && person.email === parameterValue) return person
    }
    return null
  }

  updatePersonRegistryBy = async (parameter: string, parameterValue: string, personToBeUpdated: Person): Promise<Person | null> => {
    const person = await this.fetchPersonRegistryBy(parameter, parameterValue)
    if (person === null) return null
    if (personToBeUpdated.name !== undefined) person.name = personToBeUpdated.name
    if (personToBeUpdated.email !== undefined) person.email = personToBeUpdated.email
    if (personToBeUpdated.age !== undefined) person.age = personToBeUpdated.age
    return person
  }

  deletePersonRegistryBy = async (parameter: string, parameterValue: string): Promise<Person | null> => {
    for (let i = 0; i < this.personList.length; i++) {
      if (this.personList[i].id === parameterValue) {
        const person = this.personList[i]
        this.personList.splice(i, 1)
        return person
      }
    }
    return null
  }
}

export default MemoryDataSource
