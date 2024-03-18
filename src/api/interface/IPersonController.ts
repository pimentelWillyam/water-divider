import { type Request, type Response } from 'express'
import type IPersonValidator from './IPersonValidator'
import type IPersonService from './IPersonService'

interface IPersonController {
  readonly personService: IPersonService
  readonly personValidator: IPersonValidator

  create: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>
  getAll: (res: Response) => Promise<Response<any, Record<string, any>>>
  get: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>
  update: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>
  patch: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>
  delete: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>
}

export default IPersonController
