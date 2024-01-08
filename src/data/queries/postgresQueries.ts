
const postgresQueries = {
  createBoilerplateDatabase: 'CREATE DATABASE  EXISTS boilerplate ;',
  verifyIfBoilerplateDatabaseExists: "SELECT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'boilerplate') AS exists ;",
  verifyIfPersonTableExists: "SELECT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'boilerplate') AS exists ;",
  useBoilerplateDatabase: 'USE boilerplate ;',
  createPersonTable: `CREATE TABLE person (
      id VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      age INT NOT NULL,
      PRIMARY KEY (id)
    );`,
  insertPersonRegistry: 'INSERT INTO boilerplate.person (id, name, email, age) VALUES ($1,$2,$3,$4) ;',
  fetchEveryPersonRegistry: 'SELECT * FROM boilerplate.person ;',
  fetchPersonRegistryBy: 'SELECT * FROM boilerplate.person WHERE $1 = $2 ;',
  updatePersonRegistryBy: ` UPDATE boilerplate.person SET
    id = ?,
    name = ?,
    email = ?,
    age = ?
    WHERE WHERE $1 = $2 ;`,
  deletePersonRegistryBy: 'DELETE FROM nome_da_tabela WHERE $1 ;'

}

export { postgresQueries }
