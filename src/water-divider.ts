// import { APIFactory } from './api/factory/APIFactory'
// import { DataSourceFactory } from './api/factory/DataSourceFactory'
import { PostgresDataSource } from './data/PostgresDataSource'
import { dataSourceConfig } from './data/dataSourceConfig'

class Main {
  async start (): Promise<void> {
    // const dataSource = new DataSourceFactory().fabricate('mariadb')
    // const api = new APIFactory(dataSource).fabricate()
    // api.start(4000)
    // await dataSource.start()
    const dataSource = new PostgresDataSource(dataSourceConfig.postgres)
    await dataSource.bootstrap2()
  }
}

void new Main().start()
