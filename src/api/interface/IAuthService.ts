import type Person from '../entity/Person'

interface IAuthService {
  authenticate: (login: string, password: string) => Promise<Person>

}

export default IAuthService
