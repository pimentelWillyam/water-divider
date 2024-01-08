import { type DatabasePerson } from './model/DatabasePerson'
// import { type DatabaseType } from './type/DatabaseType'
import { type TableType } from './type/TableType'
import { type IOutOfMemoryDataSource } from './interface/IOutOfMemoryDataSource'
import type Person from '../api/entity/Person'

import { postgresQueries } from './queries/postgresQueries'
import { Pool } from 'pg'
import { type DataSourceConnectionConfig } from './type/DataSourceConnectionConfig'

class PostgresDataSource implements IOutOfMemoryDataSource {
  private readonly connectionPool: Pool
  // const client = new Client()
  // await client.connect()

  // const res = await client.query('SELECT $1::text as message', ['Hello world!''])
  // console.log(res.rows[0].message) // Hello world!
  // await client.end()

  constructor (private readonly connectionConfig: DataSourceConnectionConfig) {
    this.connectionPool = new Pool({ host: this.connectionConfig.host, port: this.connectionConfig.port, user: this.connectionConfig.user, password: this.connectionConfig.password, max: this.connectionConfig.connectionLimit })
  }

  async start (): Promise<void> {
    await this.bootstrap()
    console.log('Database started')
  }

  async stop (): Promise<void> {
    await this.endConnectionPool()
    console.log('Database stopped')
  }

  private async bootstrap (): Promise<void> {
    if (await this.databaseExists()) await this.createNecessaryDatabases()
    console.log('test')
    await this.createTables()
  }

  async bootstrap2 (): Promise<void> {
    if (!await this.databaseExists()) await this.createTables()
    await this.createTables()
    // console.log('test')
    //
  }

  private async endConnectionPool (): Promise<void> {
    await this.connectionPool.end()
  }

  private async createNecessaryDatabases (): Promise<void> {
    await this.createBoilerplateDatabase()
  }

  private async databaseExists (): Promise<boolean> {
    const response = await this.connectionPool.query(postgresQueries.verifyIfBoilerplateDatabaseExists)
    return response.rows[0].exists
  }

  async createBoilerplateDatabase (): Promise<void> {
    await this.connectionPool.query(postgresQueries.createBoilerplateDatabase)
  }

  private async createTable (tableName: TableType): Promise<void> {
    switch (tableName) {
      case 'person':
        await this.connectionPool.query(postgresQueries.createPersonTable)

        return
      default:

        throw new Error(`Invalid table name: ${tableName as string}`)
    }
  }

  private async tableExists (tableName: string): Promise<boolean> {
    let queryResult
    switch (tableName) {
      case 'person':
        queryResult = (await this.connectionPool.query(postgresQueries.verifyIfPersonTableExists))
        return queryResult.rows[0].exists

      default:
        throw new Error(`Invalid table name: ${tableName}`)
    }
  }

  private async createTables (): Promise<void> {
    if (await this.tableExists('person')) await this.createTable('person')
  }

  async insertPersonRegistry (person: Person): Promise<DatabasePerson> {
    await this.connectionPool.query(postgresQueries.insertPersonRegistry, [person.id, person.name, person.email, person.age])

    return person
  }

  async fetchEveryPersonRegistry (): Promise<DatabasePerson[]> {
    const queryResult = await this.connectionPool.query(postgresQueries.fetchEveryPersonRegistry)

    return queryResult.rows[0]
  }

  async fetchPersonBy (parameter: string, parameterValue: string): Promise<DatabasePerson | null> {
    const queryResult = await this.connectionPool.query(postgresQueries.fetchPersonRegistryBy, [parameter, parameterValue])

    if (queryResult.rows[0] === undefined) return null
    else return queryResult.rows[0]
  }

  async updatePersonBy (parameter: string, parameterValue: string, personToUpdate: Person): Promise<DatabasePerson> {
    await this.connectionPool.query(postgresQueries.updatePersonRegistryBy, [personToUpdate.id, personToUpdate.name, personToUpdate.email, personToUpdate.age, parameter, parameterValue])

    return personToUpdate
  }

  async deletePersonBy (parameter: string, parameterValue: string): Promise<DatabasePerson | null> {
    const person = await this.fetchPersonBy(parameter, parameterValue)

    if (person === null) return null
    await this.connectionPool.query(postgresQueries.deletePersonRegistryBy, [parameter, parameterValue])
    return person
  }
}

export { PostgresDataSource }
