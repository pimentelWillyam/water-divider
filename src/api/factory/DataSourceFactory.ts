import MariadbDataSource from '../../data/MariadbDataSource'
import MemoryDataSource from '../../data/MemoryDataSource'
import { type IDataSourceFactory } from '../interface/IDataSourceFactory'
import { type DataSourceType } from '../../data/type/DataSourceType'
import { config } from '../../config'
import { type DataSource } from '../../data/type/Datasource'
import { PostgresDataSource } from '../../data/PostgresDataSource'

class DataSourceFactory implements IDataSourceFactory {
  fabricate (dataSourceType: DataSourceType): DataSource {
    switch (dataSourceType) {
      case 'memory':
        return new MemoryDataSource()

      case 'mariadb':
        return new MariadbDataSource(config.dataSource.mariadb.host, config.dataSource.mariadb.port, config.dataSource.mariadb.user, config.dataSource.mariadb.password, config.dataSource.mariadb.connectionLimit)

      case 'postgres':
        return new PostgresDataSource(config.dataSource.postgres)
      default:
        throw new Error('Error during data source creation')
    }
  }
}

export { DataSourceFactory }
