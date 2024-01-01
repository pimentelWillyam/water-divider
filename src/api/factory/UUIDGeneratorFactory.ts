import UUIDGenerator from '../helper/UUIDGenerator'
import { type IUUIDGenerator } from '../interface/IUUIDGenerator'
import { type IUUIDGeneratorFactory } from '../interface/IUUIDGeneratorFactory'

class UUIDGeneratorFactory implements IUUIDGeneratorFactory {
  fabricate (): IUUIDGenerator {
    return new UUIDGenerator()
  }
}

export { UUIDGeneratorFactory }
