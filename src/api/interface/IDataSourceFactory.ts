import { type DataSourceType } from '../type/DataSourceType'
import { type DataSource } from '../type/Datasource'

interface IDataSourceFactory {
  fabricate: (dataSourceType: DataSourceType) => DataSource
}

export type { IDataSourceFactory }
