import type KnownError from '../validator/errors/KnownError'

interface IErrorFactory {
  create: (errorType: string, invalidDataTypeAttribute?: string) => KnownError
}

export type { IErrorFactory }
