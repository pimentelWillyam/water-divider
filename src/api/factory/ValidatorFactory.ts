import { type IValidatorFactory } from '../interface/IValidatorFactory'
import { type Validator } from '../type/Validator'
import { type ValidatorType } from '../type/ValidatorType'
import PersonValidator from '../validator/PersonValidator'
import { ErrorFactory } from './ErrorFactory'
import AuthValidator from '../validator/AuthValidator'

class ValidatorFactory implements IValidatorFactory {
  fabricate (validatorType: ValidatorType): Validator {
    switch (validatorType) {
      case 'person':
        return new PersonValidator(new ErrorFactory())

      case 'auth':
        return new AuthValidator(new ErrorFactory())
      default:
        throw new Error('Error at validator fabrication')
    }
  }
}

export { ValidatorFactory }
