const mariadbQueries = {
  createDatabase: 'CREATE DATABASE ?;',
  useDatabase: 'USE ?;',
  fetchDatabase: 'SHOW DATABASES LIKE ? ;',
  createPersonTable: `CREATE TABLE person (
    id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    PRIMARY KEY (id)
  );`,
  fetchTable: 'SHOW TABLES FROM ? LIKE "?";',

  insertPersonRegistry: 'INSERT INTO person (id, name, email, age);',

  fetchEveryPersonRegistry: 'SELECT * FROM boilerplate.person;',

  fetchPersonRegistryBy: 'SELECT * FROM boilerplate.person WHERE ? = ?;',

  updatePersonRegistryBy: `UPDATE boilerplate.person SET
  id = ?,
  name = ?,
  email = ?,
  age = ?
  WHERE id = ?;`,

  deletePersonRegistryBy: 'DELETE FROM boilerplate.person WHERE ? = ?\';'
}

export { mariadbQueries }
