import KnownError from '../KnownError'

class InvalidEmailError extends KnownError {
  constructor () {
    super('Email inválido', 'Não é possivel cadastrar um email inválido, ele precisa seguir o formato exemplo@exemplo.exemplo', 400)
  }
}

export default InvalidEmailError
