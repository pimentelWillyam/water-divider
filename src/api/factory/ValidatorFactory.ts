import { type IValidatorFactory } from '../interface/IValidatorFactory'
import { type Validator } from '../type/Validator'
import { type ValidatorType } from '../type/ValidatorType'
import PersonValidator from '../validator/PersonValidator'
import { ErrorFactory } from './ErrorFactory'
import AuthValidator from '../validator/AuthValidator'
import { type Service } from '../type/Service'
import type PersonService from '../service/PersonService'

class ValidatorFactory implements IValidatorFactory {
  fabricate (validatorType: ValidatorType, necessaryService?: Service): Validator {
    switch (validatorType) {
      case 'person':
        return new PersonValidator(new ErrorFactory(), necessaryService as PersonService)

      case 'auth':
        return new AuthValidator(new ErrorFactory())
      default:
        throw new Error('Error at validator fabrication')
    }
  }
}

export { ValidatorFactory }
