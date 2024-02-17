const mariadbQueries = {
  createBoilerplateDatabase: 'CREATE DATABASE IF NOT EXISTS boilerplate ;',
  useBoilerplateDatabase: 'USE boilerplate ;',
  createPersonTable: `CREATE TABLE IF NOT EXISTS boilerplate.person (
    id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    PRIMARY KEY (id)
  );`,
  insertPersonRegistry: 'INSERT INTO boilerplate.person (id, name, password, email, age) VALUES (?,?,?,?,?);',

  fetchEveryPersonRegistry: 'SELECT * FROM boilerplate.person;',

  fetchPersonRegistryBy: 'SELECT * FROM boilerplate.person WHERE "?" = "?";',

  fetchPersonRegistryById: 'SELECT * FROM boilerplate.person WHERE id = ? ;',
  id = ?,
  name = ?,
  email = ?,
  age = ?
  WHERE id = ?;`,

  deletePersonRegistryBy: 'DELETE FROM boilerplate.person WHERE "?" = "?";'
}

export { mariadbQueries }
