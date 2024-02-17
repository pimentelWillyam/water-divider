import { createPool } from 'mariadb'
import type { Pool, PoolConnection } from 'mariadb'
import { mariadbQueries } from './queries/mariadbQueries'
import { type DatabaseType } from './type/DatabaseType'
import { type TableType } from './type/TableType'
import { type IDataSource } from './interface/IDataSource'
import type Person from '../api/entity/Person'

class MariadbDataSource implements IDataSource {
  private readonly pool: Pool

  constructor (private readonly hostAddress: string, private readonly port: number, private readonly userName: string, private readonly password: string, private readonly connectionLimit: number) {
    this.pool = createPool({ host: this.hostAddress, port: this.port, user: this.userName, password: this.password, connectionLimit: this.connectionLimit })
  }

  async start (): Promise<void> {
    await this.bootstrap()
    console.log('Database started')
  }

  async stop (): Promise<void> {
    await this.endConnectionPool()
    console.log('Database stopped')
  }

  private async getConnectionFromPool (): Promise<PoolConnection> {
    return await this.pool.getConnection()
  }

  private async releaseConnection (connection: PoolConnection): Promise<void> {
    await connection.end()
  }

  private async bootstrap (): Promise<void> {
    await this.createNecessaryDatabases()
    await this.useDatabase('boilerplate')
    await this.createTables()
  }

  private async endConnectionPool (): Promise<void> {
    await this.pool.end()
  }

  private async createNecessaryDatabases (): Promise<void> {
    await this.createBoilerplateDatabase()
  }

  async createBoilerplateDatabase (): Promise<void> {
    const connection = await this.getConnectionFromPool()
    await connection.query(mariadbQueries.createBoilerplateDatabase)
    await this.releaseConnection(connection)
  }

  private async useDatabase (databaseName: DatabaseType): Promise<void> {
    const connection = await this.getConnectionFromPool()
    await connection.query(mariadbQueries.useBoilerplateDatabase)
    await this.releaseConnection(connection)
  }

  private async createTable (tableName: TableType): Promise<void> {
    const connection = await this.getConnectionFromPool()
    switch (tableName) {
      case 'person':

        await connection.query(mariadbQueries.createPersonTable)
        await this.releaseConnection(connection)

        return
      default:
        await this.releaseConnection(connection)
        throw new Error(`Invalid table name: ${tableName as string}`)
    }
  }

  private async createTables (): Promise<boolean> {
    await this.createTable('person')
    return true
  }

  async insertPersonRegistry (person: Person): Promise<Person> {
    const connection = await this.getConnectionFromPool()
    await connection.query(mariadbQueries.insertPersonRegistry, [person.id, person.name, person.password, person.email, person.age])
    await this.releaseConnection(connection)
    return person
  }

  async fetchEveryPersonRegistry (): Promise<Person[]> {
    const connection = await this.getConnectionFromPool()
    const personList = await connection.query(mariadbQueries.fetchEveryPersonRegistry)
    await this.releaseConnection(connection)
    return personList
  }

  async fetchPersonBy (parameter: string, parameterValue: string): Promise<Person | null> {
    const connection = await this.getConnectionFromPool()
    const personList = await connection.query(mariadbQueries.fetchPersonRegistryBy, [parameter, parameterValue])
    await this.releaseConnection(connection)
    if (personList[0] === undefined) return null
    else return personList[0]
  }

  async updatePersonBy (parameter: string, parameterValue: string, personToUpdate: Person): Promise<Person> {
    const connection = await this.getConnectionFromPool()
    await connection.query(mariadbQueries.updatePersonRegistryBy, [personToUpdate.id, personToUpdate.name, personToUpdate.email, personToUpdate.age, parameter, parameterValue])
    await this.releaseConnection(connection)
    return personToUpdate
  }

  async deletePersonBy (parameter: string, parameterValue: string): Promise<Person | null> {
    const connection = await this.getConnectionFromPool()
    const person = await this.fetchPersonBy(parameter, parameterValue)
    await this.releaseConnection(connection)
    if (person === null) return null
    await connection.query(mariadbQueries.deletePersonRegistryBy, [parameter, parameterValue])
    return person
  }
}

export default MariadbDataSource
