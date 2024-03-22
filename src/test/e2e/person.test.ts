import { APIFactory } from '../../api/factory/APIFactory'

import * as request from 'supertest'
import { DataSourceFactory } from '../../api/factory/DataSourceFactory'
import {Helper}

// getting .env configuration

describe('User integration tests', () => {
  const dataSource = new DataSourceFactory().fabricate('memory')
  const api = new APIFactory(dataSource).fabricate()
  const tokenGener
  let authenticationToken = ''
  beforeEach(() => {
    api.start(4000)
  })

  afterEach(async () => {
    api.stop()
    await dataSource.stop()
  })
  test('Deve inserir uma pessoa no banco em memória', async () => {
    const response = await request(api.server).post('/api/person').send({
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
    const response = await request(api.server).post('/api/person').send({
      name: 'wil',
      email: 'willyam@gmail.com',
      age: 22
    })
    expect(response.status).toEqual(400)
    expect(response.body.errorList[0].name).toEqual('Nome abaixo de quatro letras')
    expect(response.body.errorList[0].message).toEqual('Não é possivel cadastrar um nome com a quantidade de caracteres abaixo de quatro letras')
  })

  test('Não deve inserir uma pessoa cujo nome possui algum número', async () => {
    const response = await request(api.server).post('/api/person').send({
      name: 'will2016',
      email: 'willyam@gmail.com',
      age: 22
    })
    expect(response.status).toEqual(400)
    expect(response.body.errorList[0].name).toEqual('Nome possui algum número')
    expect(response.body.errorList[0].message).toEqual('Não é possivel cadastrar um nome que contenha números')
  })

  test('A padronização dos nomes deve ser efetuada', async () => {
    const response = await request(api.server).post('/api/person').send({
      name: 'wallace',
      email: 'wallace@gmail.com',
      age: 22
    })
    expect(response.status).toEqual(201)
    expect(response.body.name).toEqual('Wallace')
    expect(response.body.email).toEqual('wallace@gmail.com')
    expect(response.body.age).toEqual(22)
  })

  test('Deve buscar uma lista de pessoas no banco em memória', async () => {
    await request(api.server).post('/api/person').send({
      name: 'wesley',
      email: 'wesley@gmail.com',
      age: 22
    })
    const response = await request(api.server).get('/api/person')
    expect(response.status).toEqual(200)
    expect(response.body.length).toEqual(1)
    expect(response.body[0].name).toEqual('Wesley')
    expect(response.body[0].email).toEqual('wesley@gmail.com')
    expect(response.body[0].age).toEqual(22)
  })

  test('Não deve ser possível cadastrar um email fora do padrão', async () => {
    const response = await request(api.server).post('/api/person').send({
      name: 'willyam',
      email: 'willyam:gmail!com',
      age: 22
    })
    expect(response.status).toEqual(400)
    expect(response.body.errorList[0].name).toEqual('Email inválido')
    expect(response.body.errorList[0].message).toEqual('Não é possivel cadastrar um email inválido, ele precisa seguir o formato exemplo@exemplo.exemplo')
  })

  test('Não deve ser possível cadastrar uma pessoa menor que 18 ou maior que 65', async () => {
    const response = await request(api.server).post('/api/person').send({
      name: 'willyam',
      email: 'willyam@gmail.com',
      age: 16
    })
    expect(response.status).toEqual(400)
    expect(response.body.errorList[0].name).toEqual('Idade inválida')
    expect(response.body.errorList[0].message).toEqual('Não é possivel cadastrar uma idade inválida, para uma idade ser válida precisa estar entre 18 e 65')
  })

  test('Não deve ser possível cadastrar uma pessoa com algum dado nulo ou indefinido', async () => {
    const firstResponse = await request(api.server).post('/api/person').send({
      name: '',
      email: '',
      age: 22
    })

    const secondResponse = await request(api.server).post('/api/person').send({
      name: 'willyam',
      email: '',
      age: 22
    })

    const thirdResponse = await request(api.server).post('/api/person').send({
      name: 'willyam',
      email: 'willyam@gmail.com',
      age: undefined
    })
    expect(firstResponse.status).toEqual(400)
    expect(firstResponse.body.errorList[0].name).toEqual('Tipo de dado inválido')
    expect(firstResponse.body.errorList[0].message).toEqual('Não é possivel cadastrar um nome vazio, indefinido ou nulo')
    expect(secondResponse.status).toEqual(400)
    expect(secondResponse.body.errorList[0].name).toEqual('Tipo de dado inválido')
    expect(secondResponse.body.errorList[0].message).toEqual('Não é possivel cadastrar um email vazio, indefinido ou nulo')
    expect(thirdResponse.status).toEqual(400)
    expect(thirdResponse.body.errorList[0].name).toEqual('Tipo de dado inválido')
    expect(thirdResponse.body.errorList[0].message).toEqual('Não é possivel cadastrar um idade vazio, indefinido ou nulo')
  })

  test('Deve atualizar uma pessoa inserida no banco em memória', async () => {
    const firstResponse = await request(api.server).post('/api/person').send({
      name: 'willyam',
      email: 'willyam@gmail.com',
      age: 22
    })

    const response = await request(api.server).put(`/api/person/${firstResponse.body.id as string}`).send({
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
    const firstResponse = await request(api.server).post('/api/person').send({
      name: 'willyam',
      email: 'willyam@gmail.com',
      age: 22
    })

    const response = await request(api.server).delete(`/api/person/${firstResponse.body.id as string}`).send()
    expect(response.status).toEqual(200)
    expect(response.body.age).toEqual(22)
  })
})
