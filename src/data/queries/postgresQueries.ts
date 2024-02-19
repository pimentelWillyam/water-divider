
const postgresQueries = {
  createBoilerplateDatabase: 'CREATE DATABASE boilerplate ;',
  verifyIfBoilerplateDatabaseExists: "SELECT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'boilerplate') AS exists ;",
  verifyIfPersonTableExists: "SELECT EXISTS (SELECT 1 FROM pg_class WHERE relname  = 'person' );",
  useBoilerplateDatabase: 'USE boilerplate ;',
  createPersonTable: `CREATE TABLE person (
      id VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      age INT NOT NULL,
      PRIMARY KEY (id)
    );`,
  insertPersonRegistry: 'INSERT INTO person (id, name, email, age) VALUES ($1,$2,$3,$4) ;',
  fetchEveryPersonRegistry: 'SELECT * FROM person ;',
  fetchPersonRegistryBy: 'SELECT * FROM person WHERE $1 = $2 ;',
  fetchPersonRegistryById: 'SELECT * FROM person WHERE id = $1 ;',
  fetchPersonRegistryByEmail: 'SELECT * FROM person WHERE email = $1 ;',
  updatePersonRegistryBy: ` UPDATE person SET
    id = ?,
    name = ?,
    email = ?,
    age = ?
    WHERE WHERE $1 = $2 ;`,
  deletePersonRegistryBy: 'DELETE FROM nome_da_tabela WHERE $1 ;'

}

export { postgresQueries }
