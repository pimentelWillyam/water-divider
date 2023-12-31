import { type Service } from '../type/Service'
import { type ServiceType } from '../type/ServiceType'

interface IServiceFactory {
  fabricate: (serviceType: ServiceType) => Service
}

export type { IServiceFactory }
