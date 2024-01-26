import { APIFactory } from './api/factory/APIFactory'
import { DataSourceFactory } from './api/factory/DataSourceFactory'
import * as dotenv from 'dotenv-safe'

dotenv.config()

class Main {
  async start (): Promise<void> {
    const dataSource = new DataSourceFactory().fabricate('postgres')
    const api = new APIFactory(dataSource).fabricate()
    api.start(4000)
    await dataSource.start()
  }
}

void new Main().start()
