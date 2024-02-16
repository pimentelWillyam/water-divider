import type AuthResponse from '../entity/AuthResponse'
import type IAuthService from '../interface/IAuthService'
import type IPersonRepository from '../interface/IPersonRepository'
import { type IJsonWebTokenGenerator } from '../interface/IJsonWebTokenGenerator'
import { type IErrorFactory } from '../interface/IErrorFactory'

class AuthService implements IAuthService {
  constructor (readonly errorFactory: IErrorFactory, readonly personRepository: IPersonRepository, readonly jsonWebTokenGenerator: IJsonWebTokenGenerator) {}

  async authenticate (login: string, password: string): Promise<AuthResponse> {
    const person = await this.personRepository.getByLogin(login)
    console.log(person)
    if (person === null || person.login !== login || person.password !== password) throw this.errorFactory.create('invalid login or password')
    return {
      id: person.id,
      name: person.name,
      email: person.email,
      token: this.jsonWebTokenGenerator.generate(person.id, person.name, person.email)
    }
  }
}

export default AuthService
