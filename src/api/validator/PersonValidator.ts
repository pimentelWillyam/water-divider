import type IPersonValidator from '../interface/IPersonValidator'
import InvalidAgeError from './errors/person/InvalidAgeError'
import InvalidDataTypeError from './errors/person/InvalidDataTypeError'
import InvalidEmailError from './errors/person/InvalidEmailError'
import NameHasAnyNumberError from './errors/person/NameHasAnyNumberError'
import NameLengthBelowFourLettersError from './errors/person/NameLengthBelowFourLettersError'

class PersonValidator implements IPersonValidator {
  validateCreation (name: string, email: string, age: number): void {
    if (this.valueIsNullOrUndefinedOrEmpty(name)) throw new InvalidDataTypeError('nome')
    if (this.valueIsNullOrUndefinedOrEmpty(email)) throw new InvalidDataTypeError('email')
    if (this.valueIsNullOrUndefinedOrEmpty(age)) throw new InvalidDataTypeError('idade')
    if (!this.nameIsLongEnough(name)) throw new NameLengthBelowFourLettersError()
    if (!this.nameHasNoNumbers(name)) throw new NameHasAnyNumberError()
    if (!this.isEmailValid(email)) throw new InvalidEmailError()
    if (!this.isAgeValid(age)) throw new InvalidAgeError()
  }

  validateUpdate (name: string, email: string, age: number): void {
    if (name !== undefined && this.valueIsNullOrEmpty(name)) throw new InvalidDataTypeError('nome')
    if (email !== undefined && this.valueIsNullOrEmpty(email)) throw new InvalidDataTypeError('email')
    if (age !== undefined && this.valueIsNullOrEmpty(age)) throw new InvalidDataTypeError('idade')
    if (name !== undefined && !this.nameIsLongEnough(name)) throw new NameLengthBelowFourLettersError()
    if (name !== undefined && !this.nameHasNoNumbers(name)) throw new NameHasAnyNumberError()
    if (email !== undefined && !this.isEmailValid(email)) throw new InvalidEmailError()
    if (age !== undefined && !this.isAgeValid(age)) throw new InvalidAgeError()
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

export default PersonValidator
