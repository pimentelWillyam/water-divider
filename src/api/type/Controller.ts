import { type AuthController } from '../controller/AuthController'
import type EmailSenderController from '../controller/EmailSenderController'
import type PersonController from '../controller/PersonController'

type Controller = PersonController | AuthController | EmailSenderController

export { type Controller }
