import { type NameNormalizer } from '../helper/NameNormalizer'
import type UUIDGenerator from '../helper/UUIDGenerator'
import type Person from '../entity/Person'
import type IPersonRepository from '../interface/IPersonRepository'
import type IPersonService from '../interface/IPersonService'

class PersonService implements IPersonService {
  constructor (readonly personRepository: IPersonRepository, readonly idGenerator: UUIDGenerator, readonly fullNameNormalizer: NameNormalizer) {}

  async create (password: string, name: string, email: string, age: number): Promise<Person> {
    return await this.personRepository.create(this.idGenerator.generate(), password, this.fullNameNormalizer.normalize(name), email, age)
  }

  async getAll (): Promise<Person[]> {
    return await this.personRepository.getAll()
  }

  async get (id: string): Promise<Person | null> {
    return await this.personRepository.get(id)
  }

  async getByEmail (email: string): Promise<Person | null> {
    return await this.personRepository.getByEmail(email)
  }

  async update (id: string, personToBeUpdated: Person): Promise<Person | null> {
    return await this.personRepository.update(id, personToBeUpdated.password, this.fullNameNormalizer.normalize(personToBeUpdated.name), personToBeUpdated.email, personToBeUpdated.age)
  }

  async delete (id: string): Promise<Person | null> {
    return await this.personRepository.delete(id)
  }
}

export default PersonService
