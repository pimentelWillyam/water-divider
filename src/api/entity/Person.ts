class Person {
  constructor (password: string, name: string, email: string, age: number) {
    this.name = name
    this.password = password
    this.email = email
    this.age = age
  }

  id!: string
  email!: string
  password!: string
  name!: string
  age!: number
}

export default Person
