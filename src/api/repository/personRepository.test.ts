import type Person from '../entity/Person'
import PersonRepository from './PersonRepository'
import MemoryDataSource from '../../data/MemoryDataSource'

test('Deve ser possível cadastrar uma pessoa', async () => {
  const memoryDataSource = new MemoryDataSource()
  const personRepository = new PersonRepository(memoryDataSource)
  const person = await personRepository.create('aaaaaaaaa', 'willyam', 'willyam', 'willyampimenteldev@gmail.com', 22)
  expect(person.name).toBe('willyam')
  expect(person.email).toBe('willyampimenteldev@gmail.com')
  expect(person.age).toBe(22)
})

test('Deve ser possível buscar uma lista com as pessoas cadastrada', async () => {
  const memoryDataSource = new MemoryDataSource()
  const personRepository = new PersonRepository(memoryDataSource)
  const person = await personRepository.create('aaaaaaaaa', 'willyam', 'willyam', 'willyampimenteldev@gmail.com', 22)
  const personList = await personRepository.getAll()
  expect(person.name).toBe(personList[0].name)
  expect(person.email).toBe(personList[0].email)
  expect(person.age).toBe(personList[0].age)
})

test('Deve ser possível buscar uma pessoa cadastrada', async () => {
  const memoryDataSource = new MemoryDataSource()
  const personRepository = new PersonRepository(memoryDataSource)
  const person = await personRepository.create('aaaaaaaaa', 'willyam', 'willyam', 'willyampimenteldev@gmail.com', 22)
  const fetchedPerson = await personRepository.get('aaaaaaaaa') as Person
  expect(person.name).toBe(fetchedPerson.name)
  expect(person.email).toBe(fetchedPerson.email)
  expect(person.age).toBe(fetchedPerson.age)
})

test('Deve ser possível atualizar uma pessoa cadastrada', async () => {
  const memoryDataSource = new MemoryDataSource()
  const personRepository = new PersonRepository(memoryDataSource)
  await personRepository.create('aaaaaaaaa', 'willyam', 'willyam', 'willyampimenteldev@gmail.com', 22)
  const updatedPerson = await memoryDataSource.updatePersonRegistryBy('id', 'aaaaaaaaa', { id: 'aaa', name: 'pimentel', password: 'pimentel', age: 24, email: 'pimentelwillyamdev@gmail.com' }) as Person
  expect(updatedPerson.name).toBe('pimentel')
  expect(updatedPerson.age).toBe(24)
  expect(updatedPerson.email).toBe('pimentelwillyamdev@gmail.com')
})

test('Deve ser possível deletar uma pessoa cadastrada', async () => {
  const memoryDataSource = new MemoryDataSource()
  const personRepository = new PersonRepository(memoryDataSource)
  await personRepository.create('aaaaaaaaa', 'willyam', 'willyam', 'willyampimenteldev@gmail.com', 22)
  const deletedPerson = await personRepository.delete('aaaaaaaaa') as Person
  expect(deletedPerson.name).toBe('willyam')
  expect(deletedPerson.email).toBe('willyampimenteldev@gmail.com')
  expect(deletedPerson.age).toBe(22)
})
