interface ILogValidator {
  validateCreation: (name: string, email: string, age: number) => void
  validateUpdate: (name: string, email: string, age: number) => void

}

export default ILogValidator
