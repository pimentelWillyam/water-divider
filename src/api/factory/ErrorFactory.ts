import { type IErrorFactory } from '../interface/IErrorFactory'
import { type ErrorType } from '../type/ErrorType'
import { type Field } from '../type/Field'
import { type InvalidParams } from '../type/InvalidParams'

class KnownError extends Error {
  status: number
  constructor (name: string, message: string, status: number) {
    super()
    this.name = name
    this.message = message
    this.status = status
  }
}

class DetailedError extends Error {
  status: number
  detail: string
  invalidParams: InvalidParams
  constructor (name: string, message: string, detail: string, invalidParams: InvalidParams, status: number) {
    super()
    this.name = name
    this.message = message
    this.detail = detail
    this.invalidParams = invalidParams
    this.status = status
  }
}

class TokenError extends Error {
  detail: string
  status: number
  constructor (name: string, message: string, detail: string, status: number) {
    super()
    this.name = name
    this.message = message
    this.detail = detail
    this.status = status
  }
}

// class InvalidAgeError extends KnownError {
//   constructor () {
//     super('Idade inválida', 'Não é possivel cadastrar uma idade inválida, para uma idade ser válida precisa estar entre 18 e 65', 400)
//   }
// }

class DetailedInvalidAgeError extends DetailedError {
  constructor () {
    super('Idade inválida', 'Não é possivel cadastrar uma idade inválida', 'Idades abaixo de 18 e acima de 65 são consideradas inválidas', { field: 'age', reason: 'Você deve indicar uma idade válida' }, 400)
  }
}

// class InvalidDataTypeError extends KnownError {
//   constructor (attribute: string) {
//     super('Tipo de dado inválido', `Não é possivel cadastrar um ${attribute} vazio, indefinido ou nulo`, 400)
//   }
// }

class DetailedInvalidDataType extends DetailedError {
  constructor (attribute: string) {
    super('Tipo de dado inválido', `Não é possivel cadastrar um(a) ${attribute} vazio, indefinido ou nulo`, `Um(a) ${attribute} não pode ser vazio, indefinido ou nulo`, { field: attribute as Field, reason: `Você deve indicar um valor para o campo ${attribute} que seja diferente de vazio, indefinido ou nulo` }, 400)
  }
}

// class InvalidEmailError extends KnownError {
//   constructor () {
//     super('Email inválido', 'Não é possivel cadastrar um email inválido, ele precisa seguir o formato exemplo@exemplo.exemplo', 400)
//   }
// }

class DetailedInvalidEmailError extends DetailedError {
  constructor () {
    super('Email inválido', 'Não é possivel cadastrar um email inválido', 'Os emails cadastrados precisam seguir o formato "algo@algo.algo"', { field: 'email', reason: 'Você deve indicar um email válido' }, 400)
  }
}

// class NameHasAnyNumberError extends KnownError {
//   constructor () {
//     super('Nome possui algum número', 'Não é possivel cadastrar um nome que contenha números', 400)
//   }
// }

class DetailedNameHasAnyNumberError extends DetailedError {
  constructor () {
    super('Nome possui algum número', 'Não é possivel cadastrar um nome que contenha números', 'Um nome precisa conter apenas caracteres alfabéticos para ser considerado válido ', { field: 'name', reason: 'Você deve indicar um nome válido' }, 400)
  }
}

// class NameLengthBelowFourLettersError extends KnownError {
//   constructor () {
//     super('Nome abaixo de quatro letras', 'Não é possivel cadastrar um nome com a quantidade de caracteres abaixo de quatro letras', 400)
//   }
// }

class DetailedNameLengthBelowFourLettersError extends DetailedError {
  constructor () {
    super('Nome abaixo de quatro letras', 'Não é possivel cadastrar um nome com a quantidade de caracteres abaixo de quatro letras', 'Um nome precisa conter mais do que quatro letras para ser considerado válido ', { field: 'name', reason: 'Você deve indicar um nome válido' }, 400)
  }
}

class InvalidLoginOrPassword extends KnownError {
  constructor () {
    super('Login ou senha inválido', 'Não existe um usuário com esse login ou a senha inserida é inválida', 401)
  }
}

class LoginAlreadyExists extends KnownError {
  constructor () {
    super('Login existente', 'Já existe um usuário com esse login, tente se cadastrar com outro ', 400)
  }
}

// class DetailedLoginAlreadyExists extends DetailedError {
//   constructor () {
//     super('Login existente', 'Não é possivel cadastrar um login que já existe', 'Um login precisa ser único para ser considerado válido ', { field: 'email', reason: 'Você deve indicar um login único' }, 400)
//   }
// }

class EmailAlreadyExists extends KnownError {
  constructor () {
    super('Email existente', 'Já existe um usuário com esse email, tente se cadastrar com outro ', 400)
  }
}

// class DetailedEmailAlreadyExists extends DetailedError {
//   constructor () {
//     super('Email existente', 'Não é possivel cadastrar um email que já existe', 'Um email precisa ser único para ser considerado válido ', { field: 'email', reason: 'Você deve indicar um email único' }, 400)
//   }
// }

class InvalidTokenError extends TokenError {
  constructor () {
    super('Token inválido', 'O token fornecido foi considerado inválido', 'O token é nulo, expirou ou não é autêntico', 401)
  }
}

class ServerError extends KnownError {
  constructor () {
    super('Erro de servidor', 'Algo inesperado aconteceu no servidor', 500)
  }
}

class ErrorFactory implements IErrorFactory {
  create = (errorType: ErrorType, invalidDataTypeAttribute?: string): KnownError => {
    if (errorType === 'invalid age') return new DetailedInvalidAgeError()
    if (errorType === 'invalid data type' && invalidDataTypeAttribute !== undefined) return new DetailedInvalidDataType(invalidDataTypeAttribute)
    if (errorType === 'invalid email') return new DetailedInvalidEmailError()
    if (errorType === 'name has any number') return new DetailedNameHasAnyNumberError()
    if (errorType === 'name length below four letters') return new DetailedNameLengthBelowFourLettersError()
    if (errorType === 'invalid login or password') return new InvalidLoginOrPassword()
    if (errorType === 'login already exists') return new LoginAlreadyExists()
    if (errorType === 'email already exists') return new EmailAlreadyExists()
    if (errorType === 'invalid token') return new InvalidTokenError()

    return new ServerError()
  }
}

export { ErrorFactory }
