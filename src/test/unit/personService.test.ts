import type Person from '../../api/entity/Person'
import MemoryDataSource from '../../data/MemoryDataSource'
import PersonRepository from '../../api/repository/PersonRepository'
import PersonService from '../../api/service/PersonService'
import UUIDGenerator from '../../helper/UUIDGenerator'
import { NameNormalizer } from '../../helper/NameNormalizer'

test('Deve ser possível cadastrar uma pessoa', () => {
  const memoryDataSource = new MemoryDataSource()
  const personRepository = new PersonRepository(memoryDataSource)
  const idGenerator = new UUIDGenerator()
  const nameNormalizer = new NameNormalizer()
  const personService = new PersonService(personRepository, idGenerator, nameNormalizer)

  const person = personService.create('aaaaaaaaa', 'willyam', 'willyampimenteldev@gmail.com', 22)
  expect(person.name).toBe('willyam')
  expect(person.email).toBe('willyampimenteldev@gmail.com')
  expect(person.age).toBe(22)
})

test('Deve ser possível buscar uma lista com as pessoas cadastrada', () => {
  const memoryDataSource = new MemoryDataSource()
  const personRepository = new PersonRepository(memoryDataSource)
  const idGenerator = new UUIDGenerator()
  const nameNormalizer = new NameNormalizer()
  const personService = new PersonService(personRepository, idGenerator, nameNormalizer)
  const person = personService.create('aaaaaaaaa', 'willyam', 'willyampimenteldev@gmail.com', 22)
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
  const person = personService.create('aaaaaaaaa', 'willyam', 'willyampimenteldev@gmail.com', 22)
  const fetchedPerson = personService.get('aaaaaaaaa') as Person
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
  personService.update('aaaaaaaaa', { id: 'aaaaaaaaa', name: 'willyam', email: 'willyampimenteldev@gmail.com', age: 22 })
  const updatedPerson = memoryDataSource.updatePersonRegistry('aaaaaaaaa', { id: 'aaa', name: 'pimentel', age: 24, email: 'pimentelwillyamdev@gmail.com' }) as Person
  expect(updatedPerson.name).toBe('pimentel')
  expect(updatedPerson.age).toBe(24)
  expect(updatedPerson.email).toBe('pimentelwillyamdev@gmail.com')
})

test('Deve ser possível deletar uma pessoa cadastrada', () => { 
  const memoryDataSource = new MemoryDataSource()
  const personRepository = new PersonRepository(memoryDataSource)
  personRepository.create('aaaaaaaaa', 'willyam', 'willyampimenteldev@gmail.com', 22)
  const deletedPerson = personRepository.delete('aaaaaaaaa') as Person
  expect(deletedPerson.name).toBe('willyam')
  expect(deletedPerson.email).toBe('willyampimenteldev@gmail.com')
  expect(deletedPerson.age).toBe(22)
})
