import { type IErrorFactory } from '../interface/IErrorFactory'
import type IAuthValidator from '../interface/IAuthValidator'
import type KnownError from './errors/KnownError'

class AuthValidator implements IAuthValidator {
  constructor (readonly errorFactory: IErrorFactory) {}
  async validateAuthentication (login: string, password: string): Promise<KnownError[]> {
    const errorList: KnownError[] = []
    if (this.valueIsNullOrUndefinedOrEmpty(login)) errorList.push(this.errorFactory.create('invalid data type', 'login'))
    if (this.valueIsNullOrUndefinedOrEmpty(password)) errorList.push(this.errorFactory.create('invalid data type', 'senha'))
    return errorList
  }

  private readonly valueIsNullOrUndefinedOrEmpty = (value: unknown): boolean => {
    if (value === null || value === undefined || value === '') return true
    return false
  }
}

export default AuthValidator
