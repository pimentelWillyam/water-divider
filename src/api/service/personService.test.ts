import type Person from '../entity/Person'
import MemoryDataSource from '../../data/MemoryDataSource'
import PersonRepository from '../repository/PersonRepository'
import PersonService from './PersonService'
import UUIDGenerator from '../../helper/UUIDGenerator'
import { NameNormalizer } from '../../helper/NameNormalizer'

test('Deve ser possível cadastrar uma pessoa', () => {
  const memoryDataSource = new MemoryDataSource()
  const personRepository = new PersonRepository(memoryDataSource)
  const idGenerator = new UUIDGenerator()
  const nameNormalizer = new NameNormalizer()
  const personService = new PersonService(personRepository, idGenerator, nameNormalizer)

  const person = personService.create('willyam', 'willyampimenteldev@gmail.com', 22)
  expect(person.name).toBe('Willyam')
  expect(person.email).toBe('willyampimenteldev@gmail.com')
  expect(person.age).toBe(22)
})

test('Deve ser possível buscar uma lista com as pessoas cadastrada', () => {
  const memoryDataSource = new MemoryDataSource()
  const personRepository = new PersonRepository(memoryDataSource)
  const idGenerator = new UUIDGenerator()
  const nameNormalizer = new NameNormalizer()
  const personService = new PersonService(personRepository, idGenerator, nameNormalizer)
  const person = personService.create('willyam', 'willyampimenteldev@gmail.com', 22)
  const personList = personService.getAll()
  expect(person.name).toBe(personList[0].name)
  expect(person.email).toBe(personList[0].email)
  expect(person.age).toBe(personList[0].age)
})

test('Deve ser possível buscar uma pessoa cadastrada', () => {
  const memoryDataSource = new MemoryDataSource()
  const personRepository = new PersonRepository(memoryDataSource)
  const idGenerator = new UUIDGenerator()
  const nameNormalizer = new NameNormalizer()
  const personService = new PersonService(personRepository, idGenerator, nameNormalizer)
  const person = personService.create('willyam', 'willyampimenteldev@gmail.com', 22)
  const fetchedPerson = personService.get(person.id) as Person
  expect(person.name).toBe(fetchedPerson.name)
  expect(person.email).toBe(fetchedPerson.email)
  expect(person.age).toBe(fetchedPerson.age)
})

test('Deve ser possível atualizar uma pessoa cadastrada', () => {
  const memoryDataSource = new MemoryDataSource()
  const personRepository = new PersonRepository(memoryDataSource)
  const idGenerator = new UUIDGenerator()
  const nameNormalizer = new NameNormalizer()
  const personService = new PersonService(personRepository, idGenerator, nameNormalizer)
  const person = personService.create('willyam', 'willyampimenteldev@gmail.com', 22)
  const updatedPerson = personService.update(person.id, { id: '', name: 'pimentel', email: 'pimentelwillyamdev@gmail.com', age: 24 }) as Person

  expect(updatedPerson.name).toBe('Pimentel')
  expect(updatedPerson.age).toBe(24)
  expect(updatedPerson.email).toBe('pimentelwillyamdev@gmail.com')
})

test('Deve ser possível deletar uma pessoa cadastrada', () => {
  const memoryDataSource = new MemoryDataSource()
  const personRepository = new PersonRepository(memoryDataSource)
  const idGenerator = new UUIDGenerator()
  const nameNormalizer = new NameNormalizer()
  const personService = new PersonService(personRepository, idGenerator, nameNormalizer)
  const person = personService.create('willyam', 'willyampimenteldev@gmail.com', 22)
  const deletedPerson = personService.delete(person.id) as Person
  expect(deletedPerson.name).toBe('Willyam')
  expect(deletedPerson.email).toBe('willyampimenteldev@gmail.com')
  expect(deletedPerson.age).toBe(22)
})
