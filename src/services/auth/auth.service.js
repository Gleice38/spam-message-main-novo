import { httpClient } from '../api/httpClient';
import { endpoints } from '../api/endpoints';

class AuthService {
  async login(credentials) {
    try {
      const response = await httpClient.post(endpoints.login, credentials);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const authService = new AuthService();
