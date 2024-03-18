import { type Request, type Response } from 'express'

interface IEmailSenderValidator {
  readonly emailSenderService: IEmailSenderService
  readonly emailSenderValidator: IEmailSenderValidator

  sendPasswordChangeEmail: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>
}

export default IEmailSenderValidator
