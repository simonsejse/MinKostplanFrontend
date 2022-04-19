import axios from 'axios';
import { axiosRequestConfig } from '../../config/axios-config';

const BASE_API_URL = 'http://localhost:8080/api/recipes';

class RecipeService {
  async getCategories() {
    return axios.get(`${BASE_API_URL}/categories`, axiosRequestConfig);
  }
}

export default new RecipeService();
