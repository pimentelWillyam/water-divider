const dataSourceConfig = {
  mariadb: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'mariadb',
    connectionLimit: 5
  },
  postgres: {
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    port: 5432,
    connectionLimit: 5

  }

}

export { dataSourceConfig }
