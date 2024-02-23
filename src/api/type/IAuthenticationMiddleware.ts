import { type NextFunction, type Request, type Response } from 'express'

interface IAuthenticationMiddleware {
  authenticateToken: (req: Request, res: Response, nextFunction: NextFunction) => void
}

export type { IAuthenticationMiddleware }
