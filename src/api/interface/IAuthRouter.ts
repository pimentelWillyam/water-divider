import type { Router } from 'express'

import type IAuthController from './IAuthController'

interface IAuthRouter {
  readonly authController: IAuthController
  readonly routes: Router
}

export default IAuthRouter
