import MemoryDataSource from '../../data/MemoryDataSource'
import { type IDataSourceFactory } from '../interface/IDataSourceFactory'
import { type DataSourceType } from '../type/DataSourceType'

class DataSourceFactory implements IDataSourceFactory {
  fabricate (dataSourceType: DataSourceType): MemoryDataSource {
    switch (dataSourceType) {
      case 'memory':
        return new MemoryDataSource()
      default:
        throw new Error('Error during data source creation')
    }
  }
}

export { DataSourceFactory }
