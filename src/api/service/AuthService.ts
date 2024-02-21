import type AuthResponse from '../entity/AuthResponse'
import type IAuthService from '../interface/IAuthService'
import type IPersonRepository from '../interface/IPersonRepository'
import { type IJsonWebTokenGenerator } from '../interface/IJsonWebToken'
import { type IErrorFactory } from '../interface/IErrorFactory'

class AuthService implements IAuthService {
  constructor (readonly errorFactory: IErrorFactory, readonly personRepository: IPersonRepository, readonly jsonWebTokenGenerator: IJsonWebTokenGenerator) {}

  async authenticate (login: string, password: string): Promise<AuthResponse> {
    const person = await this.personRepository.getByEmail(login)
    return {
      id: person?.id as string,
      name: person?.name as string,
      email: person?.email as string,
      token: this.jsonWebTokenGenerator.generate(person?.id as string, person?.name as string, person?.email as string)
    }
  }
}

export default AuthService
