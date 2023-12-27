import type Person from '../entity/Person'
import { type INameNormalizer } from '../interface/INameNormalizer'
import type IPersonRepository from '../interface/IPersonRepository'
import type IPersonService from '../interface/IPersonService'
import { type IUUIDGenerator } from '../interface/IUUIDGenerator'

class PersonService implements IPersonService {
  constructor (readonly PersonRepository: IPersonRepository, readonly idGenerator: IUUIDGenerator, readonly fullNameNormalizer: INameNormalizer) {}

  create (name: string, email: string, age: number): Person {
    return this.PersonRepository.create(this.idGenerator.generate(), this.fullNameNormalizer.normalize(name), email, age)
  }

  getAll (): Person[] {
    return this.PersonRepository.getAll()
  }

  get (id: string): Person | null {
    return this.PersonRepository.get(id)
  }

  update (id: string, personToBeUpdated: Person): Person | null {
    return this.PersonRepository.update(id, this.fullNameNormalizer.normalize(personToBeUpdated.name), personToBeUpdated.email, personToBeUpdated.age)
  }

  delete (id: string): Person | null {
    return this.PersonRepository.delete(id)
  }
}

export default PersonService
