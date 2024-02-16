import { type IErrorFactory } from '../interface/IErrorFactory'
import type IAuthValidator from '../interface/IAuthValidator'
import type KnownError from './errors/KnownError'
import type IPersonService from '../interface/IPersonService'

class AuthValidator implements IAuthValidator {
  constructor (readonly errorFactory: IErrorFactory, private readonly personService: IPersonService) {}
  async validateAuthentication (login: string, password: string): Promise<KnownError[]> {
    const errorList: KnownError[] = []
    if (this.valueIsNullOrUndefinedOrEmpty(login)) errorList.push(this.errorFactory.create('invalid data type', 'login'))
    if (this.valueIsNullOrUndefinedOrEmpty(password)) errorList.push(this.errorFactory.create('invalid data type', 'senha'))
    const person = await this.personService.getByEmail(login)
    if (person === null || password !== person?.password || login !== person.email) errorList.push(this.errorFactory.create('invalid login or password'))
    return errorList
  }

  private readonly valueIsNullOrUndefinedOrEmpty = (value: unknown): boolean => {
    if (value === null || value === undefined || value === '') return true
    return false
  }
}

export default AuthValidator
