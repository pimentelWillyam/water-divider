import type KnownError from '../validator/errors/KnownError'

interface IPersonValidator {
  validateAuthentication: (login: string, password: string) => Promise<KnownError[]>

}

export default IPersonValidator
