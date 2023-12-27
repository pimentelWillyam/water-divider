import { LocalDatabase, Validator } from '../../missions/seventhMission/seventhMission'

test('Deve ser possível cadastrar uma pessoa', () => {
  const localDatabase = new LocalDatabase(new Validator())
  localDatabase.insertPerson('willyam', 'willyampimenteldev@gmail.com', 22)
  expect(localDatabase.personList.length).toBe(1)
})
