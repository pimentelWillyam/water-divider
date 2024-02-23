interface IJsonWebToken {
  generate: (id: string, name: string, email: string) => string
  verify: (token: string) => void

}

export type { IJsonWebToken }
