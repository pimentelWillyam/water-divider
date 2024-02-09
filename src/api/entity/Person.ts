class Person {
  constructor (login: string, password: string, name: string, email: string, age: number) {
    this.name = name
    this.login = login
    this.password = password
    this.email = email
    this.age = age
  }

  id!: string
  login!: string
  password!: string
  name!: string
  email!: string
  age!: number
}

export default Person
