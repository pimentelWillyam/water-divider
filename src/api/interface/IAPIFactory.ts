import { type API } from '../API'

interface IAPIFactory {
  fabricate: () => API
}

export type { IAPIFactory }
