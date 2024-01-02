import { APIFactory } from './api/factory/APIFactory'
import { DataSourceFactory } from './api/factory/DataSourceFactory'

const dataSource = new DataSourceFactory().fabricate('mariadb')
const api = new APIFactory(dataSource).fabricate()

api.start(4000)
