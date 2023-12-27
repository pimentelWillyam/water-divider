import { LocalDatabase, Validator } from '../../missions/seventhMission/seventhMission'

test('Deve ser possível cadastrar uma pessoa', () => {
  const localDatabase = new LocalDatabase(new Validator())
  localDatabase.insertPerson('willyam', 'willyampimenteldev@gmail.com', 22)
  expect(localDatabase.personList.length).toBe(1)
})

test('Não deve ser possível cadastrar um nome com menos de 4 caracteres', () => {
  const localDatabase = new LocalDatabase(new Validator())
  localDatabase.insertPerson('nas', 'nas@gmail.com', 28)
  expect(localDatabase.personList.length).toBe(0)
})

test('Não deve ser possível cadastrar um nome que contenha números', () => {
  const localDatabase = new LocalDatabase(new Validator())
  localDatabase.insertPerson('alencar 87 é do flamengo', 'alencar87edomengao@gmail.com', 25)
  expect(localDatabase.personList.length).toBe(0)
})

test('A padronização dos nomes deve sempre ser efetuada', () => {
  const localDatabase = new LocalDatabase(new Validator())
  localDatabase.insertPerson('ueslei cristiano', 'uesleicristiano@gmail.com', 20)
  localDatabase.insertPerson('WILLYAM PIMENTEL', 'willyampimentel@gmail.com', 22)
  expect(localDatabase.personList[0].name).toBe('Ueslei Cristiano')
  expect(localDatabase.personList[1].name).toBe('Willyam Pimentel')
})

test('Não deve ser possível cadastrar um email fora do padrão', () => {
  const localDatabase = new LocalDatabase(new Validator())
  localDatabase.insertPerson('sargento fabio', 'sargentofabio!gmail:com', 29)
  expect(localDatabase.personList.length).toBe(0)
})

test('Não deve ser possível cadastrar uma pessoa menor que 18 ou maior que 65', () => {
  const localDatabase = new LocalDatabase(new Validator())
  localDatabase.insertPerson('elaine', 'elaine@gmail.com', 16)
  expect(localDatabase.personList.length).toBe(0)
})

test('Não deve ser possível cadastrar uma pessoa com algum dado nulo ou indefinido', () => {
  const localDatabase = new LocalDatabase(new Validator())
  localDatabase.insertPerson('', 'email@gmail.com', 18)
  localDatabase.insertPerson('nome', null as unknown as string, 18)
  localDatabase.insertPerson('nome', 'email@gmail.com', undefined as unknown as number)
  expect(localDatabase.personList.length).toBe(0)
})
