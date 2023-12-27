import { LocalDatabase } from '../../missions/sixthMission/sixthMission'

test('Deve ser capaz de registrar pessoas', () => {
  const localDatabase = new LocalDatabase()
  localDatabase.insertPerson({ name: 'nascimento', email: 'nascimento@gmail.com', age: 25 })
  localDatabase.insertPerson({ name: 'alencar', email: 'alencar@gmail.com', age: 24 })
  localDatabase.insertPerson({ name: 'cristiano', email: 'cristiano@gmail.com', age: 20 })
  localDatabase.insertPerson({ name: 'fabio', email: 'fabio@gmail.com', age: 27 })
  expect(localDatabase.personList.length).toBe(4)
})
