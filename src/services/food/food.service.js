import axios from 'axios';
import { axiosRequestConfig } from '../../config/axios-config';

const BASE_API_URL = 'http://localhost:8080/api/foods';

class FoodService {
  async getAllFoodDTOs() {
    return axios.get(BASE_API_URL, axiosRequestConfig);
  }
  async getFoodDTOById(id) {
    return axios.get(`${BASE_API_URL}/${id}`);
  }
}

export default new FoodService();
