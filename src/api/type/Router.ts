import type AuthRouter from '../router/AuthRouter'
import type EmailSenderRouter from '../router/EmailSenderRouter'
import type PersonRouter from '../router/PersonRouter'

type Router = PersonRouter | AuthRouter | EmailSenderRouter

export type { Router }
