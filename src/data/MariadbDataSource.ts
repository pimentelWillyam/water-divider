import { createPool } from 'mariadb'
import type { Pool } from 'mariadb'
import { type DatabasePerson } from './model/DatabasePerson'
import { mariadbQueries } from './queries/mariadbQueries'
import { type DatabaseType } from './type/DatabaseType'
import { type TableType } from './type/TableType'
import { type IMariadbDataSource } from './interface/IMariadbDataSource'
import type Person from '../api/entity/Person'

class MariadbDataSource implements IMariadbDataSource {
  private pool: Pool | undefined

  constructor (private readonly hostAddress: string, private readonly port: number, private readonly userName: string, private readonly password: string) {}

  async start (): Promise<void> {
    await this.bootstrap()
  }

  async stop (): Promise<void> {
    await this.closeConnectionPool()
  }

  async bootstrap (): Promise<void> {
    // await this.openConnectionPool()
    await this.createNecessaryDatabases()
    await this.useDatabase('boilerplate')
    await this.createNecessaryTables()
    // await this.closeConnectionPool()
  }

  private async openConnectionPool (): Promise<void> {
    this.pool = createPool({ host: this.hostAddress, port: this.port, user: this.userName, password: this.password })
  }

  private async closeConnectionPool (): Promise<void> {
    await this.pool?.end()
  }

  private async createNecessaryDatabases (): Promise<void> {
    if (!await this.databaseExists('boilerplate')) await this.createDatabase('boilerplate')
  }

  async createDatabase (databaseName: DatabaseType): Promise<void> {
    await this.openConnectionPool()
    await this.pool?.query(mariadbQueries.createDatabase, [databaseName])
    await this.closeConnectionPool()
  }

  private async useDatabase (databaseName: DatabaseType): Promise<void> {
    await this.openConnectionPool()
    await this.pool?.query(mariadbQueries.useDatabase, [databaseName])
    await this.closeConnectionPool()
  }

  private async databaseExists (databaseName: DatabaseType): Promise<boolean> {
    await this.openConnectionPool()
    const databaseList = await this.pool?.query(mariadbQueries.fetchDatabase, [databaseName])
    await this.closeConnectionPool()
    if (databaseList.length > 0) return true
    return false
  }

  private async createTable (tableName: TableType): Promise<void> {
    switch (tableName) {
      case 'person':
        await this.openConnectionPool()
        await this.pool?.query(mariadbQueries.createPersonTable)
        await this.closeConnectionPool()

        return
      default:
        throw new Error(`Invalid table name: ${tableName as string}`)
    }
  }

  private async tableExists (tableName: TableType): Promise<boolean> {
    await this.openConnectionPool()
    const res = await this.pool?.query(mariadbQueries.fetchTable, [tableName])
    await this.closeConnectionPool()
    if (res[0] == null) {
      return false
    }
    return true
  }

  private async createNecessaryTables (): Promise<boolean> {
    if (!await this.tableExists('person')) await this.createTable('person')
    return true
  }

  async insertPersonRegistry (person: Person): Promise<DatabasePerson> {
    await this.openConnectionPool()
    await this.pool?.query(mariadbQueries.insertPersonRegistry, [person.id, person.name, person.email, person.age])
    await this.closeConnectionPool()
    return person
  }

  async fetchEveryPersonRegistry (): Promise<DatabasePerson[]> {
    return await this.pool?.query(mariadbQueries.fetchEveryPersonRegistry) as DatabasePerson[]
  }

  async fetchPersonBy (parameter: string, parameterValue: string): Promise<DatabasePerson | null> {
    await this.openConnectionPool()
    const personList = await this.pool?.query(mariadbQueries.updatePersonRegistryBy, [parameter, parameterValue])
    await this.closeConnectionPool()
    if (personList[0] === undefined) return null
    else return personList[0]
  }

  async updatePersonBy (parameter: string, parameterValue: string, personToUpdate: Person): Promise<DatabasePerson> {
    await this.openConnectionPool()
    await this.pool?.query(mariadbQueries.updatePersonRegistryBy, [personToUpdate.id, personToUpdate.name, personToUpdate.email, personToUpdate.age, parameter, parameterValue])
    await this.closeConnectionPool()
    return personToUpdate
  }

  async deletePersonBy (parameter: string, parameterValue: string): Promise<DatabasePerson | null> {
    await this.openConnectionPool()
    const person = await this.fetchPersonBy(parameter, parameterValue)
    await this.closeConnectionPool()
    if (person === null) return null
    await this.pool?.query(mariadbQueries.deletePersonRegistryBy, [parameter, parameterValue])
    return person
  }
}

export default MariadbDataSource
