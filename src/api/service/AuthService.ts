import type AuthResponse from '../entity/AuthResponse'
import type IAuthService from '../interface/IAuthService'
import type IPersonRepository from '../interface/IPersonRepository'
import { type IJsonWebToken } from '../interface/IJsonWebToken'
import { type IErrorFactory } from '../interface/IErrorFactory'
import { type IEmail } from '../interface/IEmail'

class AuthService implements IAuthService {
  constructor (readonly errorFactory: IErrorFactory, readonly personRepository: IPersonRepository, readonly jsonWebTokenGenerator: IJsonWebToken, private readonly email: IEmail) {}

  async authenticate (login: string, password: string): Promise<AuthResponse> {
    const person = await this.personRepository.getByEmail(login)
    this.email.send(person?.email as string, 'Sua conta foi logada', 'Nesse momento houve um login na sua conta, se não foi efetuado por você é recomendável que mude a sua senha para evitar que volte a acontecer')
    return {
      id: person?.id as string,
      name: person?.name as string,
      email: person?.email as string,
      token: this.jsonWebTokenGenerator.generate(person?.id as string, person?.name as string, person?.email as string)
    }
  }
}

export default AuthService
