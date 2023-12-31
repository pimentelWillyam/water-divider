import { type ErrorType } from '../type/ErrorType'
import type KnownError from '../validator/errors/KnownError'

interface IErrorFactory {
  create: (errorType: ErrorType, invalidDataTypeAttribute?: string) => KnownError
}

export type { IErrorFactory }
