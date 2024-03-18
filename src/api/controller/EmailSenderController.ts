import { type Request, type Response } from 'express'

import KnownError from '../validator/errors/KnownError'
import type IEmailSenderController from '../interface/IEmailSenderController'
import type IEmailSenderService from '../interface/IEmailSenderService'
import type IPersonService from '../interface/IPersonService'

class EmailSenderController implements IEmailSenderController {
  constructor (readonly emailSenderService: IEmailSenderService, private readonly personService: IPersonService) {}

  async sendPasswordChangeEmail (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const person = await this.personService.getByEmail(req.body.email)
      if (person === null) throw new KnownError('Pessoa não encontrada', 'Não foi possível encontrar a pessoa a partir desse e-mail', 404)
      await this.emailSenderService.sendPasswordChangeEmail(person)
      return res.status(200).json({ message: 'Foi enviado para você um link contendo a rota e as instruções para a mudança de email ' })
    } catch (error) {
      console.error(error)
      if (error instanceof KnownError) {
        return res.status(error.status).send({ name: error.name, message: error.message })
      }

      return res.status(500).send({ name: 'Erro desconhecido', error })
    }
  }
}

export default EmailSenderController
