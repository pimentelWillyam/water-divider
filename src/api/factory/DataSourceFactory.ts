import MariadbDataSource from '../../data/MariadbDataSource'
import MemoryDataSource from '../../data/MemoryDataSource'
import { type IDataSourceFactory } from '../interface/IDataSourceFactory'
import { type DataSourceType } from '../../data/type/DataSourceType'
import { dataSourceConfig } from '../../data/dataSourceConfig'
import { type DataSource } from '../../data/type/Datasource'

class DataSourceFactory implements IDataSourceFactory {
  fabricate (dataSourceType: DataSourceType): DataSource {
    switch (dataSourceType) {
      case 'memory':
        return new MemoryDataSource()

      case 'mariadb':
        return new MariadbDataSource(dataSourceConfig.mariadb.host, dataSourceConfig.mariadb.port, dataSourceConfig.mariadb.user, dataSourceConfig.mariadb.password, dataSourceConfig.mariadb.connectionLimit)
      default:
        throw new Error('Error during data source creation')
    }
  }
}

export { DataSourceFactory }
