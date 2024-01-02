const mariadbQueries = {
  createPersonTable: `CREATE TABLE person (
    id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    PRIMARY KEY (id)
  );`,

  insertPersonRegistry: 'INSERT INTO person (id, name, email, age)',

  fetchEveryPersonRegistry: 'SELECT * FROM boilerplate.person ;',

  fetchPersonRegistryByParameter: 'SELECT * FROM boilerplate.person WHERE '

}

export { mariadbQueries }
