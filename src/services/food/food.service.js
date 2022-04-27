import axios from 'axios';
import { axiosRequestConfig } from '../../config/axios-config';

const BASE_API_URL = 'http://localhost:8080/api/foods';

class FoodService {
  async getAllFoodDTOs() {
    return axios.get(BASE_API_URL, axiosRequestConfig);
  }
}

export default new FoodService();
