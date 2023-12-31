import type { Router } from './type/Router'

import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import { json } from 'express'
import { type Express } from 'express'

// importando interfaces
import { type Server } from 'http'
import type { IAPI } from './interface/IAPI'
class API implements IAPI {
  private listener: Server | undefined
  constructor (readonly server: Express, routeList: Router[]) {
    this.server.use(bodyParser.json())
    this.server.use(json())
    this.server.use(cors())
    routeList.forEach((route) => {
      this.server.use('/api', route.routes)
    })
  }

  start (listenerPort: number): void {
    this.listener = this.server.listen(listenerPort, () => {
      console.log('Server started at the door ', listenerPort)
    })
  }

  stop (): void {
    this.listener?.close()
  }
}

export { API }
