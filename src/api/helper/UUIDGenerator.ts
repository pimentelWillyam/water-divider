import { v4 as uuidv4 } from 'uuid'
import { type IUUIDGenerator } from '../api/interface/IUUIDGenerator'

class UUIDGenerator implements IUUIDGenerator {
  generate (): string {
    return uuidv4()
  }
}

export default UUIDGenerator
