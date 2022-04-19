import axios from 'axios';
import { axiosRequestConfig } from '../../config/axios-config';

const API_URL = 'http://localhost:8080/api/foods';

class FoodService {
  async getAllFoods() {
    return axios.get(API_URL, axiosRequestConfig).then((resp) => {
      return resp.data;
    });
  }
}

export default new FoodService();
