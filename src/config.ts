const config = {
  dataSource: {
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

    },
    api: {
      host: process.env.HOST_API ?? 'localhost',
      port: process.env.PORT_API ?? 4000
    }
  }

}

export { config }
