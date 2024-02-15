import type AuthReponse from '../entity/AuthResponse'

interface IAuthService {
  authenticate: (login: string, password: string) => Promise<AuthReponse>

}

export default IAuthService
