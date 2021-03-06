import axios from 'axios';
import { axiosRequestConfig } from '../../config/axios-config';

const API_BASE_URL = 'http://localhost:8080';

class AuthService {
  isAuthenticated() {
    return axios.get(`${API_BASE_URL}/isAuthenticated`, axiosRequestConfig);
  }

  logIn(email, password, remember_me) {
    const body = {
      username: email,
      password: password,
    };
    return axios.post(
      `${API_BASE_URL}/login?remember-me=${remember_me}`,
      body,
      axiosRequestConfig
    );
  }

  requestResetCredentials(email) {
    return axios.get(`${API_BASE_URL}/reset/credentials?email=${email}`);
  }

  resetCredentials(token, newPassword, newPasswordConfirmed) {
    return axios.post(
      `${API_BASE_URL}/reset/credentials`,
      { token, newPassword, newPasswordConfirmed },
      axiosRequestConfig
    );
  }

  logOut() {
    return axios.get(`${API_BASE_URL}/logout`, axiosRequestConfig);
  }

  register(registerRequest) {
    return axios.post(`${API_BASE_URL}/signup`, registerRequest);
  }
}

export default new AuthService();
