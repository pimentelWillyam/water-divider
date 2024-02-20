
const postgresQueries = {
  createBoilerplateDatabase: 'CREATE DATABASE boilerplate ;',
  verifyIfBoilerplateDatabaseExists: "SELECT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'boilerplate') AS exists ;",
  verifyIfPersonTableExists: "SELECT EXISTS (SELECT 1 FROM pg_class WHERE relname  = 'person' );",
  useBoilerplateDatabase: 'USE boilerplate ;',
  createPersonTable: `CREATE TABLE person (
      id VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      age INT NOT NULL,
      PRIMARY KEY (id)
    );`,
  insertPersonRegistry: 'INSERT INTO person (id, name, password, email, age) VALUES ($1,$2,$3,$4,$5) ;',
  fetchEveryPersonRegistry: 'SELECT * FROM person ;',
  fetchPersonRegistryBy: 'SELECT * FROM person WHERE $1 = $2 ;',
  fetchPersonRegistryById: 'SELECT * FROM person WHERE id = $1 ;',
  fetchPersonRegistryByEmail: 'SELECT * FROM person WHERE email = $1 ;',
  updatePersonRegistryById: ` UPDATE person SET
    id = $1,
    name = $2,
    password = $3,
    email = $4,
    age = $5
    WHERE id = $6 ;`,
  deletePersonRegistryById: 'DELETE FROM person WHERE id = $1 ;'

}

export { postgresQueries }
