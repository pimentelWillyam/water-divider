interface IJsonWebTokenGenerator {
  generate: (id: string, name: string, email: string) => string
}

export type { IJsonWebTokenGenerator }
