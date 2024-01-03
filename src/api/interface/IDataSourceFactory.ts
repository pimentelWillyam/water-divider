import { type DataSourceType } from '../../data/type/DataSourceType'
import { type DataSource } from '../../data/type/Datasource'

interface IDataSourceFactory {
  fabricate: (dataSourceType: DataSourceType) => DataSource
}

export type { IDataSourceFactory }
