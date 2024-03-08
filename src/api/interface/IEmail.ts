interface IEmail {
  send: (destiny: string, title: string, message: string) => void
}

export type { IEmail }
