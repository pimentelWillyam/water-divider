// importing external libraries
import { Server } from 'http'

import * as express from 'express'

import * as request from 'supertest'

// importing helpers
import Api from '../../missions/ninthMission/helper/Api'

// importing data classes
import MemoryDataSource from '../../missions/ninthMission/data/MemoryDataSource'

// importing routers
import PersonRouter from '../../missions/ninthMission/api/router/PersonRouter'

// importing controllers
import PersonController from '../../missions/ninthMission/api/controller/PersonController'

// importing validators
import PersonValidator from '../../missions/ninthMission/api/validator/PersonValidator'

// importing services
import PersonService from '../../missions/ninthMission/api/service/PersonService'

// importing repositories
import PersonRepository from '../../missions/ninthMission/api/repository/PersonRepository'

// importing app
import App from '../../missions/ninthMission/api/App'
import { NameNormalizer } from '../../missions/ninthMission/helper/NameNormalizer'
import UUIDGenerator from '../../missions/ninthMission/helper/UUIDGenerator'

// instanciating helpers
const server = new Server()

// instanciating data classes
const memoryDataSource = new MemoryDataSource()

// instanciating repositories
const personRepository = new PersonRepository(memoryDataSource)

// instanciating services
const personService = new PersonService(personRepository, new UUIDGenerator(), new NameNormalizer())

// instanciating validators
const personValidator = new PersonValidator()
// instanciating controllers
const personController = new PersonController(personService, personValidator)

// instanciating routers
const personRouter = new PersonRouter(personController)
// instanciating app related classes
const api = new Api(express(), personRouter)

// getting .env configuration

describe('User integration tests', () => {
  const app = new App(api, server)
  beforeEach(() => {
    app.start()
    memoryDataSource.start()
  })

  afterEach(() => {
    memoryDataSource.stop()
    app.stop()
  })
  test('Deve inserir uma pessoa no banco em memória', async () => {
    const response = await request(app.api.server).post('/api/person').send({
      name: 'willyam',
      email: 'willyam@gmail.com',
      age: 22
    })
    expect(response.status).toEqual(201)
    expect(response.body.name).toEqual('Willyam')
    expect(response.body.email).toEqual('willyam@gmail.com')
    expect(response.body.age).toEqual(22)
  })

  test('Não deve inserir uma pessoa cujo nome tem menos de 4 letras', async () => {
    const response = await request(app.api.server).post('/api/person').send({
      name: 'wil',
      email: 'willyam@gmail.com',
      age: 22
    })
    expect(response.status).toEqual(400)
    expect(response.body.name).toEqual('Nome abaixo de quatro letras')
    expect(response.body.message).toEqual('Não é possivel cadastrar um nome com a quantidade de caracteres abaixo de quatro letras')
  })

  test('Não deve inserir uma pessoa cujo nome possui algum número', async () => {
    const response = await request(app.api.server).post('/api/person').send({
      name: 'will2016',
      email: 'willyam@gmail.com',
      age: 22
    })
    expect(response.status).toEqual(400)
    expect(response.body.name).toEqual('Nome possui algum número')
    expect(response.body.message).toEqual('Não é possivel cadastrar um nome que contenha números')
  })

  test('A padronização dos nomes deve ser efetuada', async () => {
    const response = await request(app.api.server).post('/api/person').send({
      name: 'willyam',
      email: 'willyam@gmail.com',
      age: 22
    })
    expect(response.status).toEqual(201)
    expect(response.body.name).toEqual('Willyam')
    expect(response.body.email).toEqual('willyam@gmail.com')
    expect(response.body.age).toEqual(22)
  })

  test('Deve buscar uma lista de pessoas no banco em memória', async () => {
    await request(app.api.server).post('/api/person').send({
      name: 'willyam',
      email: 'willyam@gmail.com',
      age: 22
    })
    const response = await request(app.api.server).get('/api/person')
    expect(response.status).toEqual(200)
    expect(response.body.length).toEqual(1)
    expect(response.body[0].name).toEqual('Willyam')
    expect(response.body[0].email).toEqual('willyam@gmail.com')
    expect(response.body[0].age).toEqual(22)
  })

  test('Não deve ser possível cadastrar um email fora do padrão', async () => {
    const response = await request(app.api.server).post('/api/person').send({
      name: 'willyam',
      email: 'willyam:gmail!com',
      age: 22
    })
    expect(response.status).toEqual(400)
    expect(response.body.name).toEqual('Email inválido')
    expect(response.body.message).toEqual('Não é possivel cadastrar um email inválido, ele precisa seguir o formato exemplo@exemplo.exemplo')
  })

  test('Não deve ser possível cadastrar uma pessoa menor que 18 ou maior que 65', async () => {
    const response = await request(app.api.server).post('/api/person').send({
      name: 'willyam',
      email: 'willyam@gmail.com',
      age: 16
    })
    expect(response.status).toEqual(400)
    expect(response.body.name).toEqual('Idade inválida')
    expect(response.body.message).toEqual('Não é possivel cadastrar uma idade inválida, para uma idade ser válida precisa estar entre 18 e 65')
  })

  test('Não deve ser possível cadastrar uma pessoa com algum dado nulo ou indefinido', async () => {
    const firstResponse = await request(app.api.server).post('/api/person').send({
      name: null,
      email: 'willyam@gmail.com',
      age: 22
    })

    const secondResponse = await request(app.api.server).post('/api/person').send({
      name: 'willyam',
      email: '',
      age: 22
    })

    const thirdResponse = await request(app.api.server).post('/api/person').send({
      name: 'willyam',
      email: 'willyam@gmail.com',
      age: undefined
    })
    expect(firstResponse.status).toEqual(400)
    expect(firstResponse.body.name).toEqual('Tipo de dado inválido')
    expect(firstResponse.body.message).toEqual('Não é possivel cadastrar um nome vazio, indefinido ou nulo')
    expect(secondResponse.status).toEqual(400)
    expect(secondResponse.body.name).toEqual('Tipo de dado inválido')
    expect(secondResponse.body.message).toEqual('Não é possivel cadastrar um email vazio, indefinido ou nulo')
    expect(thirdResponse.status).toEqual(400)
    expect(thirdResponse.body.name).toEqual('Tipo de dado inválido')
    expect(thirdResponse.body.message).toEqual('Não é possivel cadastrar um idade vazio, indefinido ou nulo')
  })

  test('Deve atualizar uma pessoa inserida no banco em memória', async () => {
    const firstResponse = await request(app.api.server).post('/api/person').send({
      name: 'willyam',
      email: 'willyam@gmail.com',
      age: 22
    })

    const response = await request(app.api.server).put(`/api/person/${firstResponse.body.id as string}`).send({
      name: 'cristiano',
      email: 'cristiano@gmail.com',
      age: 20
    })
    expect(response.status).toEqual(200)
    expect(response.body.name).toEqual('Cristiano')
    expect(response.body.email).toEqual('cristiano@gmail.com')
    expect(response.body.age).toEqual(20)
  })

  test('Deve ser capaz de deletar uma pessoa inserida no banco em memória', async () => {
    const firstResponse = await request(app.api.server).post('/api/person').send({
      name: 'willyam',
      email: 'willyam@gmail.com',
      age: 22
    })

    const response = await request(app.api.server).delete(`/api/person/${firstResponse.body.id as string}`).send()
    expect(response.status).toEqual(200)
    expect(response.body.age).toEqual(22)
  })
})
