import { NameNormalizer } from '../helper/NameNormalizer'
import { type INameNormalizer } from '../interface/INameNormalizer'
import { type INameNormalizerFactory } from '../interface/INameNormalizerFactory'

class NameNormalizerFactory implements INameNormalizerFactory {
  fabricate (): INameNormalizer {
    return new NameNormalizer()
  }
}

export { NameNormalizerFactory }
