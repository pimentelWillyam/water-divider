import type KnownError from '../validator/errors/KnownError'

interface IPersonValidator {
  validateCreation: (login: string, password: string, name: string, email: string, age: number) => KnownError[]
  validateUpdate: (login: string, password: string, name: string, email: string, age: number) => KnownError[]

}

export default IPersonValidator
