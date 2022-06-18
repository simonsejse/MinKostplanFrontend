import axios from 'axios';
import { axiosRequestConfig } from '../../config/axios-config';

const API_BASE_URL = 'http://localhost:8080/api/user';

class UserService {
  getUser() {
    return axios.get(`${API_BASE_URL}/`, axiosRequestConfig);
  }

  getUserInfoForSidebar() {
    return axios.get(`${API_BASE_URL}/info-for-sidebar`, axiosRequestConfig);
  }
}

export default new UserService();
