import type MemoryDataSource from '../MemoryDataSource'
import type MariadbDataSource from '../MariadbDataSource'
import { type PostgresDataSource } from '../PostgresDataSource'

type DataSource = MemoryDataSource | MariadbDataSource | PostgresDataSource

export type { DataSource }
