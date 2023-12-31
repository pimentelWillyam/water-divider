import { type IUUIDGenerator } from './IUUIDGenerator'

interface IUUIDGeneratorFactory {
  fabricate: () => IUUIDGenerator
}

export type { IUUIDGeneratorFactory }
