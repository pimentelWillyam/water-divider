import { type Validator } from '../type/Validator'
import { type ValidatorType } from '../type/ValidatorType'

interface IValidatorFactory {
  fabricate: (validatorType: ValidatorType) => Validator
}

export type { IValidatorFactory }
