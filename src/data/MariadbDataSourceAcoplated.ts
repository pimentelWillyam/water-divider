import { createPool } from 'mariadb'
import type { Pool } from 'mariadb'
import { type DatabasePerson } from './model/DatabasePerson'
import { mariadbQueries } from './queries/mariadbQueries'

class MariadbDataSource {
  private pool: Pool | undefined

  constructor (private readonly hostAddress: string, private readonly port: number, private readonly userName: string, private readonly password: string) {}

  async bootstrap (): Promise<boolean> {
    await this.openConnectionPool()
    await this.createNecessaryDatabases()
    await this.useBoilerPlateDatabase()
    await this.createNecessaryTables()
    return true
  }

  async openConnectionPool (): Promise<boolean> {
    this.pool = createPool({ host: this.hostAddress, port: this.port, password: this.password })
    return true
  }

  async closeConnectionPool (): Promise<boolean> {
    if (this.pool === undefined) {
      return false
    }
    await this.pool.end()
    return true
  }

  async createNecessaryDatabases (): Promise<boolean> {
    if (!await this.boilerPlateDatabaseExists()) await this.createBoilerplateDatabase()
    return true
  }

  async createBoilerplateDatabase (): Promise<boolean> {
    await this.pool?.query('CREATE DATABASE boilerplate ;')
    return true
  }

  async useBoilerPlateDatabase (): Promise<boolean> {
    await this.pool?.query('USE boilerplate ;')
    return true
  }

  async boilerPlateDatabaseExists (): Promise<boolean> {
    const databaseList = await this.pool?.query("SHOW DATABASES LIKE 'boilerplate' ;")
    if (databaseList.length === 0) {
      return false
    }
    return true
  }

  async createPersonTable (): Promise<boolean> {
    await this.pool?.query(mariadbQueries.createPersonTable)

    return true
  }

  async tableExists (tableName: string): Promise<boolean> {
    const res = await this.pool?.query("SHOW TABLES FROM motion_blade LIKE '" + tableName + "' ;")
    if (res[0] == null) {
      return false
    }
    return true
  }

  async createNecessaryTables (): Promise<boolean> {
    if (!await this.tableExists('person')) await this.createPersonTable()
    return true
  }

  async insertPersonRegistry (person: DatabasePerson): Promise<DatabasePerson> {
    await this.pool?.query(mariadbQueries.insertPersonRegistry, [person.id, person.masterId, person.name, person.fatherProfession, person.youthProfession, person.currentAttributes, person.maximumAttributes, person.guard, person.buff, person.debuff, person.inventory, person.maestry])

    return person
  }

  async fetchEveryPersonRegistry (): Promise<DatabasePerson[]> {
    return await this.pool?.query('SELECT * FROM boilerplate.person ;') as DatabasePerson[]
  }

  async fetchPersonBy (parameter: string, parameterValue: string): Promise<DatabasePerson | null> {
    const servantList = await this.pool?.query(`SELECT * FROM boilerplate.person WHERE ${parameter} = '${parameterValue}' ;`)
    if (servantList[0] === undefined) return null
    else return servantList[0]
  }

  async updatePersonBy (parameter: string, parameterValue: string, servantToUpdate: DatabasePerson): Promise<DatabasePerson> {
    const query = `UPDATE boilerplate.person SET id=?,masterId=?,name=?,fatherProfession=?,youthProfession=?,currentAttributes=?,maximumAttributes=?,guard=?,buff=?,debuff=?,inventory=?,maestry=? WHERE ${parameter} = '${parameterValue}'`

    await this.pool?.query(query, [servantToUpdate.id, servantToUpdate.masterId, servantToUpdate.name, servantToUpdate.fatherProfession, servantToUpdate.youthProfession, servantToUpdate.currentAttributes, servantToUpdate.maximumAttributes, servantToUpdate.guard, servantToUpdate.buff, servantToUpdate.debuff, servantToUpdate.inventory, servantToUpdate.maestry])

    return servantToUpdate
  }

  async deletePersonBy (parameter: string, parameterValue: string): Promise<DatabasePerson | null> {
    const person = await this.fetchPersonBy(parameter, parameterValue)
    if (person === null) return null
    const query = `DELETE FROM boilerplate.person WHERE ${parameter} = '${parameterValue}';`
    await this.pool?.query(query, [person.id, person.masterId, person.name, person.fatherProfession, person.youthProfession, person.currentAttributes, person.maximumAttributes, person.guard, person.buff, person.debuff, person.inventory, person.maestry])
    return person
  }
}

export default MariadbDataSource
