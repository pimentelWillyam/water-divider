import { type NameNormalizer } from '../helper/NameNormalizer'
import type UUIDGenerator from '../helper/UUIDGenerator'
import type AuthResponse from '../entity/AuthResponse'
import type IAuthService from '../interface/IAuthService'
import type IPersonRepository from '../interface/IPersonRepository'

class AuthService implements IAuthService {
  constructor (readonly personRepository: IPersonRepository, readonly fullNameNormalizer: NameNormalizer) {}

  async authenticate (login: string, password: string): Promise<AuthResponse> {
    const person = await this.personRepository.getByLogin(login)
    if (person.login)
  }
}

export default AuthService
