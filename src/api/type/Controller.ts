import { type AuthController } from '../controller/AuthController'
import type PersonController from '../controller/PersonController'

type Controller = PersonController | AuthController

export { type Controller }
