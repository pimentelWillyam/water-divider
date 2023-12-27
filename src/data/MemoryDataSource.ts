import type Person from '../api/entity/Person'
import { type IMemoryDataSource } from '../api/interface/IMemoryDataSource'

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

  insertPersonRegistry = (id: string, name: string, email: string, age: number): Person => {
    this.personList.push({ id, name, email, age })
    return { id, name, email, age }
  }

  fetchEveryPersonRegistry = (): Person[] => {
    return this.personList
  }

  fetchPersonRegistry = (id: string): Person | null => {
    for (const person of this.personList) {
      if (person.id === id) return person
    }
    return null
  }

  updatePersonRegistry = (id: string, personToBeUpdated: Person): Person | null => {
    const person = this.fetchPersonRegistry(id)
    if (person === null) return null
    if (personToBeUpdated.name != undefined) person.name = personToBeUpdated.name
    if (personToBeUpdated.email != undefined) person.email = personToBeUpdated.email
    if (personToBeUpdated.age != undefined) person.age = personToBeUpdated.age
    return person
  }

  deletePersonRegistry = (id: string): Person | null => {
    for (let i=0; i< this.personList.length; i++) {
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
