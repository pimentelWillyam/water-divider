import KnownError from '../KnownError'

class NameLengthBelowFourLettersError extends KnownError {
  constructor () {
    super('Nome abaixo de quatro letras', 'Não é possivel cadastrar um nome com a quantidade de caracteres abaixo de quatro letras', 400)
  }
}

export default NameLengthBelowFourLettersError
