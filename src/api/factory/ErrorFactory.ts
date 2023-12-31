import { type IErrorFactory } from '../interface/IErrorFactory'
import { type ErrorType } from '../type/ErrorType'

class KnownError extends Error {
  status: number
  constructor (name: string, message: string, status: number) {
    super()
    this.name = name
    this.message = message
    this.status = status
  }
}

class InvalidAgeError extends KnownError {
  constructor () {
    super('Idade inválida', 'Não é possivel cadastrar uma idade inválida, para uma idade ser válida precisa estar entre 18 e 65', 400)
  }
}

class InvalidDataTypeError extends KnownError {
  constructor (attribute: string) {
    super('Tipo de dado inválido', `Não é possivel cadastrar um ${attribute} vazio, indefinido ou nulo`, 400)
  }
}

class InvalidEmailError extends KnownError {
  constructor () {
    super('Email inválido', 'Não é possivel cadastrar um email inválido, ele precisa seguir o formato exemplo@exemplo.exemplo', 400)
  }
}

class NameHasAnyNumberError extends KnownError {
  constructor () {
    super('Nome possui algum número', 'Não é possivel cadastrar um nome que contenha números', 400)
  }
}

class NameLengthBelowFourLettersError extends KnownError {
  constructor () {
    super('Nome abaixo de quatro letras', 'Não é possivel cadastrar um nome com a quantidade de caracteres abaixo de quatro letras', 400)
  }
}

class ServerError extends KnownError {
  constructor () {
    super('Erro de servidor', 'Algo inesperado aconteceu no servidor', 500)
  }
}

class ErrorFactory implements IErrorFactory {
  create = (errorType: ErrorType, invalidDataTypeAttribute?: string): KnownError => {
    if (errorType === 'invalid age') return new InvalidAgeError()
    if (errorType === 'invalid data type' && invalidDataTypeAttribute !== undefined) return new InvalidDataTypeError(invalidDataTypeAttribute)
    if (errorType === 'invalid email') return new InvalidEmailError()
    if (errorType === 'name has any number') return new NameHasAnyNumberError()
    if (errorType === 'name length below four letters') return new NameLengthBelowFourLettersError()
    else return new ServerError()
  }
}

export { ErrorFactory }
