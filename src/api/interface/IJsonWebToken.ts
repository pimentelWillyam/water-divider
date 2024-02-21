interface IJsonWebToken {
  generate: (id: string, name: string, email: string) => string
  verify: (token: string, secret: string) => string

}

export type { IJsonWebToken }
