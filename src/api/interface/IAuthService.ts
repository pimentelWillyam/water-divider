import type AuthReponse from '../entity/AuthResponse'

interface IAuthService {
  authenticate: (login: string) => Promise<AuthReponse>

}

export default IAuthService
