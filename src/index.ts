import { ApiFactory } from './api/factory/APIFactory'
import { DataSourceFactory } from './api/factory/DataSourceFactory'

const dataSource = new DataSourceFactory().fabricate('memory')
const api = new ApiFactory(dataSource).fabricate()

api.start(4000)
