import type KnownError from '../validator/errors/KnownError'

interface IPersonValidator {
  validateCreation: (password: string, name: string, email: string, age: number) => Promise<KnownError[]>
  validateUpdate: (password: string, name: string, email: string, age: number) => Promise<KnownError[]>
  validatePasswordChange: (password: string) => Promise<KnownError[]>

}

export default IPersonValidator
