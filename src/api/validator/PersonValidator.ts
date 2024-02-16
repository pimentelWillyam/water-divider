import { type IErrorFactory } from '../interface/IErrorFactory'
import type IPersonService from '../interface/IPersonService'
import type IPersonValidator from '../interface/IPersonValidator'
import type KnownError from './errors/KnownError'

class PersonValidator implements IPersonValidator {
  constructor (readonly errorFactory: IErrorFactory, readonly personService: IPersonService) {}
  readonly validateCreation = async (password: string, name: string, email: string, age: number): Promise<KnownError[]> => {
    const errorList: KnownError[] = []
    if (this.valueIsNullOrUndefinedOrEmpty(password)) errorList.push(this.errorFactory.create('invalid data type', 'senha'))
    if (this.valueIsNullOrUndefinedOrEmpty(name)) errorList.push(this.errorFactory.create('invalid data type', 'nome'))
    if (this.valueIsNullOrUndefinedOrEmpty(email)) errorList.push(this.errorFactory.create('invalid data type', 'email'))
    if (this.valueIsNullOrUndefinedOrEmpty(age)) errorList.push(this.errorFactory.create('invalid data type', 'idade'))
    if (!this.nameIsLongEnough(name)) errorList.push(this.errorFactory.create('name length below four letters'))
    if (!this.nameHasNoNumbers(name)) errorList.push(this.errorFactory.create('name has any number'))
    if (!this.isEmailValid(email)) errorList.push(this.errorFactory.create('invalid email'))
    if (!this.isAgeValid(age)) errorList.push(this.errorFactory.create('invalid age'))
    if (await this.emailAlreadyExists(email)) errorList.push(this.errorFactory.create('email already exists'))
    return errorList
  }

  readonly validateUpdate = async (password: string, name: string, email: string, age: number): Promise<KnownError[]> => {
    const errorList: KnownError[] = []
    if (password !== undefined && this.valueIsNullOrUndefinedOrEmpty(password)) errorList.push(this.errorFactory.create('invalid data type', 'senha'))
    if (name !== undefined && this.valueIsNullOrEmpty(name)) errorList.push(this.errorFactory.create('invalid data type', 'nome'))
    if (email !== undefined && this.valueIsNullOrEmpty(email)) errorList.push(this.errorFactory.create('invalid data type', 'email'))
    if (age !== undefined && this.valueIsNullOrEmpty(age)) errorList.push(this.errorFactory.create('invalid data type', 'idade'))
    if (name !== undefined && !this.nameIsLongEnough(name)) errorList.push(this.errorFactory.create('name length below four letters'))
    if (name !== undefined && !this.nameHasNoNumbers(name)) errorList.push(this.errorFactory.create('name has any number'))
    if (email !== undefined && !this.isEmailValid(email)) errorList.push(this.errorFactory.create('invalid email'))
    if (age !== undefined && !this.isAgeValid(age)) errorList.push(this.errorFactory.create('invalid age'))
    if (await this.emailAlreadyExists(email)) errorList.push(this.errorFactory.create('email already exists'))
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

  private readonly emailAlreadyExists = async (email: string): Promise<boolean> => {
    if (await this.personService.getByEmail(email) !== null) return true
    return false
  }
}

export default PersonValidator
