import KnownError from '../KnownError'

class InvalidAgeError extends KnownError {
  constructor () {
    super('Idade inválida', 'Não é possivel cadastrar uma idade inválida, para uma idade ser válida precisa estar entre 18 e 65', 400)
  }
}

export default InvalidAgeError
