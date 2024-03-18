// import { type DatabaseType } from './type/DatabaseType'
import { type TableType } from './type/TableType'
import { type IDataSource } from './interface/IDataSource'
import type Person from '../api/entity/Person'

import { postgresQueries } from './queries/postgresQueries'
import { Pool, type QueryResult } from 'pg'
import { type DataSourceConnectionConfig } from './type/DataSourceConnectionConfig'

class PostgresDataSource implements IDataSource {
  private connectionPool: Pool | undefined
  constructor (private readonly connectionConfig: DataSourceConnectionConfig) {}

  async start (): Promise<void> {
    this.connectionPool = new Pool({ host: this.connectionConfig.host, port: this.connectionConfig.port, user: this.connectionConfig.user, password: this.connectionConfig.password, max: this.connectionConfig.connectionLimit })
    await this.bootstrap()
    console.log('Database started')
  }

  async stop (): Promise<void> {
    await this.endConnectionPool()
    console.log('Database stopped')
  }

  private async bootstrap (): Promise<void> {
    if (!await this.databaseExists()) await this.createNecessaryDatabases()
    this.connectionPool = new Pool({ host: this.connectionConfig.host, port: this.connectionConfig.port, user: this.connectionConfig.user, password: this.connectionConfig.password, max: this.connectionConfig.connectionLimit, database: 'boilerplate' })
    await this.createTables()
  }

  async bootstrap2 (): Promise<void> {
    if (!await this.databaseExists()) await this.createTables()
    await this.createTables()
    //
  }

  private async endConnectionPool (): Promise<void> {
    if (this.connectionPool !== undefined) await this.connectionPool.end()
  }

  private async createNecessaryDatabases (): Promise<void> {
    console.log('criando bancos necessários')
    await this.createBoilerplateDatabase()
  }

  private async databaseExists (): Promise<boolean> {
    if (this.connectionPool === undefined) throw new Error('Pool de conexões indefinida')
    const response = await this.connectionPool.query(postgresQueries.verifyIfBoilerplateDatabaseExists)
    return response.rows[0].exists
  }

  async createBoilerplateDatabase (): Promise<void> {
    if (this.connectionPool === undefined) throw new Error('Pool de conexões indefinida')
    await this.connectionPool.query(postgresQueries.createBoilerplateDatabase)
  }

  private async createTable (tableName: TableType): Promise<void> {
    if (this.connectionPool === undefined) throw new Error('Pool de conexões indefinida')
    switch (tableName) {
      case 'person':
        console.log('criando tabela person')
        await this.connectionPool.query(postgresQueries.createPersonTable)

        return
      default:

        throw new Error(`Invalid table name: ${tableName as string}`)
    }
  }

  private async tableExists (tableName: string): Promise<boolean> {
    let queryResult
    if (this.connectionPool === undefined) throw new Error('Pool de conexões indefinida')
    switch (tableName) {
      case 'person':
        queryResult = (await this.connectionPool.query(postgresQueries.verifyIfPersonTableExists))
        return queryResult.rows[0].exists

      default:
        throw new Error(`Invalid table name: ${tableName}`)
    }
  }

  private async createTables (): Promise<void> {
    if (!await this.tableExists('person')) await this.createTable('person')
  }

  async insertPersonRegistry (person: Person): Promise<Person> {
    if (this.connectionPool === undefined) throw new Error('Pool de conexões indefinida')
    await this.connectionPool.query(postgresQueries.insertPersonRegistry, [person.id, person.name, person.password, person.email, person.age])

    return person
  }

  async fetchEveryPersonRegistry (): Promise<Person[]> {
    if (this.connectionPool === undefined) throw new Error('Pool de conexões indefinida')
    const queryResult = await this.connectionPool.query(postgresQueries.fetchEveryPersonRegistry)

    return queryResult.rows
  }

  async fetchPersonRegistryBy (parameter: string, parameterValue: string): Promise<Person | null> {
    if (this.connectionPool === undefined) throw new Error('Pool de conexões indefinida')
    let queryResult: QueryResult<any>
    switch (parameter) {
      case 'id':
        queryResult = await this.connectionPool.query(postgresQueries.fetchPersonRegistryById, [parameterValue])
        if (queryResult.rows[0] === undefined) return null
        return queryResult.rows[0]
      case 'email':
        queryResult = await this.connectionPool.query(postgresQueries.fetchPersonRegistryByEmail, [parameterValue])
        if (queryResult.rows[0] === undefined) return null
        return queryResult.rows[0]
      default:
        throw new Error('Parâmetro de obtenção inválido')
    }
  }

  async updatePersonRegistryBy (parameter: string, parameterValue: string, personToUpdate: Person): Promise<Person> {
    if (this.connectionPool === undefined) throw new Error('Pool de conexões indefinida')
    const res = await this.connectionPool.query(postgresQueries.updatePersonRegistryById, [personToUpdate.id, personToUpdate.name, personToUpdate.password, personToUpdate.email, personToUpdate.age, parameterValue])
    if (res.rowCount === undefined) throw new Error('Não foi possível alterar um registro com esse ID')

    return personToUpdate
  }

  async deletePersonRegistryBy (parameter: string, parameterValue: string): Promise<Person | null> {
    const person = await this.fetchPersonRegistryBy(parameter, parameterValue)
    if (this.connectionPool === undefined) throw new Error('Pool de conexões indefinida')

    if (person === null) return null
    await this.connectionPool.query(postgresQueries.deletePersonRegistryById, [parameterValue])
    return person
  }
}

export { PostgresDataSource }
