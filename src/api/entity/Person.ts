class Person {
  constructor (name: string, email: string, age: number) {
    this.name = name
    this.email = email
    this.age = age
  }

  id!: string
  name!: string
  email!: string
  age!: number
}

export default Person
