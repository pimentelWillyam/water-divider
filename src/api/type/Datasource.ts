import type MemoryDataSource from '../../data/MemoryDataSource'
import type MariadbDataSource from '../../data/MariadbDataSource'

type DataSource = MemoryDataSource | MariadbDataSource

export type { DataSource }
