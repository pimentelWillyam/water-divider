import type { Router } from 'express'

import type IEmailSenderController from './IEmailSenderController'

interface IEmailSenderRouter {
  readonly emailSenderController: IEmailSenderController
  readonly routes: Router
}

export default IEmailSenderRouter
