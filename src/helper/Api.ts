import { type Express } from 'express'

import type IPersonRouter from '../api/interface/IPersonRouter'

import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import { json } from 'express'

class Api {
  constructor (readonly server: Express, readonly personRouter: IPersonRouter) {
    this.server.use(bodyParser.json())
    this.server.use(json())
    this.server.use(cors())
    this.server.use('/api', personRouter.routes)
  }
}

export default Api
