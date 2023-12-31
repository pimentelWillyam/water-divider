import { type Controller } from '../type/Controller'
import { type ControllerType } from '../type/ControllerType'

interface IControllerFactory {
  fabricate: (controllerType: ControllerType) => Controller
}

export type { IControllerFactory }
