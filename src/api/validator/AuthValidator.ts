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

  validateUpdate (login: string, password: string, name: string, email: string, age: number): KnownError[] {
    const errorList: KnownError[] = []
    if (login !== undefined && this.valueIsNullOrUndefinedOrEmpty(login)) errorList.push(this.errorFactory.create('invalid data type', 'login'))
    if (password !== undefined && this.valueIsNullOrUndefinedOrEmpty(password)) errorList.push(this.errorFactory.create('invalid data type', 'senha'))
    if (name !== undefined && this.valueIsNullOrEmpty(name)) errorList.push(this.errorFactory.create('invalid data type', 'nome'))
    if (email !== undefined && this.valueIsNullOrEmpty(email)) errorList.push(this.errorFactory.create('invalid data type', 'email'))
    if (age !== undefined && this.valueIsNullOrEmpty(age)) errorList.push(this.errorFactory.create('invalid data type', 'idade'))
    if (name !== undefined && !this.nameIsLongEnough(name)) errorList.push(this.errorFactory.create('name length below four letters'))
    if (name !== undefined && !this.nameHasNoNumbers(name)) errorList.push(this.errorFactory.create('name has any number'))
    if (email !== undefined && !this.isEmailValid(email)) errorList.push(this.errorFactory.create('invalid email'))
    if (age !== undefined && !this.isAgeValid(age)) errorList.push(this.errorFactory.create('invalid age'))
    return errorList
  }

  private readonly nameIsLongEnough = (name: string): boolean => {
    if (name.length <= 3) return false
    return true
  }

  private readonly nameHasNoNumbers = (name: string): boolean => {
    for (const letter of name) {
      if (letter === '0' || letter === '1' || letter === '2' || letter === '3' || letter === '4' || letter === '5' || letter === '6' || letter === '7' || letter === '8' || letter === '9') return false
    }
    return true
  }

  private readonly isEmailValid = (email: string): boolean => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return true
    return false
  }

  private readonly isAgeValid = (age: number): boolean => {
    if (age > 17 && age < 66) return true
    return false
  }

  private readonly valueIsNullOrUndefinedOrEmpty = (value: unknown): boolean => {
    if (value === null || value === undefined || value === '') return true
    return false
  }

  private readonly valueIsNullOrEmpty = (value: unknown): boolean => {
    if (value === null || value === '') return true
    return false
  }
}

export default AuthValidator
