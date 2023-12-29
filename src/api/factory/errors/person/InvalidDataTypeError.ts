import KnownError from '../KnownError'

class InvalidDataTypeError extends KnownError {
  constructor (attribute: string) {
    super('Tipo de dado inválido', `Não é possivel cadastrar um ${attribute} vazio, indefinido ou nulo`, 400)
  }
}

export default InvalidDataTypeError
