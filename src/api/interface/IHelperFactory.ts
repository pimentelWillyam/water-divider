import { type Helper } from '../type/Helper'
import { type HelperType } from '../type/HelperType'

interface IHelperFactory {
  fabricate: (helperType: HelperType) => Helper
}

export type { IHelperFactory }
