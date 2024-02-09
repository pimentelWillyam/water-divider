import type AuthRouter from '../router/AuthRouter'
import type PersonRouter from '../router/PersonRouter'

type Router = PersonRouter | AuthRouter

export type { Router }
