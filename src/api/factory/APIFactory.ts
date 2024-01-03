import * as express from 'express'
import { API } from '../API'
import { type IAPIFactory } from '../interface/IAPIFactory'
import { RouterFactory } from './RouterFactory'
import { type DataSource } from '../../data/type/Datasource'

class APIFactory implements IAPIFactory {
  private readonly routerFactory
  constructor (dataSource: DataSource) {
    this.routerFactory = new RouterFactory(dataSource)
  }

  fabricate (): API {
    return new API(express(), [this.routerFactory.fabricate('person')])
  }
}

export { APIFactory }
