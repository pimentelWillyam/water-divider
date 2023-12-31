import { type INameNormalizer } from './INameNormalizer'

interface INameNormalizerFactory {
  fabricate: () => INameNormalizer
}

export type { INameNormalizerFactory }
