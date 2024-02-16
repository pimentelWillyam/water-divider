import type AuthValidator from '../validator/AuthValidator'
import type PersonValidator from '../validator/PersonValidator'

type Validator = PersonValidator | AuthValidator

export { type Validator }
