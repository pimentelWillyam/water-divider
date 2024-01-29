const config = {
  dataSource: {
    mariadb: {
      host: process.env.MARIADB_HOST ?? 'localhost',
      port: parseInt(process.env.MARIADB_PORT as string) ?? 3306,
      user: process.env.MARIADB_USER ?? 'root',
      password: process.env.MARIADB_PASSWORD ?? 'mariadb',
      connectionLimit: parseInt(process.env.MARIADB_CONNECTION_LIMIT as string) ?? 5
    },
    postgres: {
      host: process.env.MARIADB_HOST ?? 'localhost',
      port: parseInt(process.env.MARIADB_PORT as string) ?? 5432,
      user: process.env.MARIADB_USER ?? 'postgres',
      password: process.env.MARIADB_PASSWORD ?? 'postgres',
      connectionLimit: parseInt(process.env.MARIADB_CONNECTION_LIMIT as string) ?? 5

    },
    api: {
      host: process.env.HOST_API ?? 'localhost',
      port: process.env.PORT_API ?? 4000
    }
  }

}

export { config }
