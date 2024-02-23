import * as dotenv from 'dotenv-safe'

dotenv.config()

const config = {
  dataSource: {
    mariadb: {
      host: process.env.MARIADB_HOST as string,
      port: parseInt(process.env.MARIADB_PORT as string),
      user: process.env.MARIADB_USER as string,
      password: process.env.MARIADB_PASSWORD as string,
      connectionLimit: parseInt(process.env.MARIADB_CONNECTION_LIMIT as string) ?? 5
    },
    postgres: {
      host: process.env.POSTGRES_HOST as string,
      port: parseInt(process.env.POSTGRES_PORT as string),
      user: process.env.POSTGRES_USER as string,
      password: process.env.POSTGRES_PASSWORD as string,
      connectionLimit: parseInt(process.env.POSTGRES_CONNECTION_LIMIT as string)

    }
  },
  api: {
    host: process.env.HOST_API as string,
    port: process.env.PORT_API as string
  },
  jwt: {
    secret: process.env.JWT_AUTHENTICATION_SECRET as string,
    expiresIn: process.env.JWT_EXPIRATION_TIME as string
  }

}

export { config }
