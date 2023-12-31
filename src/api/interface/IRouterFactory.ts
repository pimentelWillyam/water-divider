import { type Router } from '../type/Router'
import type { RouterType } from '../type/RouterType'

interface IRouterFactory {
  fabricate: (routerType: RouterType) => Router
}

export type { IRouterFactory }
