import type KnownError from '../validator/errors/KnownError'

interface ILogValidator {
  validateCreation: (name: string, email: string, age: number) => KnownError[]
  validateUpdate: (name: string, email: string, age: number) => KnownError[]

}

export default ILogValidator
