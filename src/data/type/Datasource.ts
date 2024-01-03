import type MemoryDataSource from '../MemoryDataSource'
import type MariadbDataSource from '../MariadbDataSource'

type DataSource = MemoryDataSource | MariadbDataSource

export type { DataSource }
