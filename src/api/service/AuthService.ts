import { type NameNormalizer } from '../helper/NameNormalizer'
import type AuthResponse from '../entity/AuthResponse'
import type IAuthService from '../interface/IAuthService'
import type IPersonRepository from '../interface/IPersonRepository'
import { type IJsonWebTokenGenerator } from '../interface/IJsonWebTokenGenerator'

class AuthService implements IAuthService {
  constructor (readonly personRepository: IPersonRepository, readonly fullNameNormalizer: NameNormalizer, readonly jsonWebTokenGenerator: IJsonWebTokenGenerator) {}

  async authenticate (login: string): Promise<AuthResponse> {
    const person = await this.personRepository.getByLogin(login)
    if (person === null) throw new Error('Valor inesperado para variável person')
    return {
      id: person.id,
      name: person.name,
      email: person.email,
      token: this.jsonWebTokenGenerator.generate(person.id, person.name, person.email)
    }
  }
}

export default AuthService
