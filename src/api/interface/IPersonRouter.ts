import type { Router } from 'express'

import type IPersonController from './IPersonController'

interface IPersonRouter {
  readonly personController: IPersonController
  readonly routes: Router
}

export default IPersonRouter
