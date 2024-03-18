import type IEmailSenderService from './IEmailSenderService'
import { type Request, type Response } from 'express'

interface IEmailSenderController {
  readonly emailSenderService: IEmailSenderService

  sendPasswordChangeEmail: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>
}

export default IEmailSenderController
