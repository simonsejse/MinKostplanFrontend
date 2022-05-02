import axios from 'axios';
import { axiosRequestConfig } from '../../config/axios-config';

const BASE_API_URL = 'http://localhost:8080/api/measurements';

class Measurements {
  async getAvailableMeasurements() {
    return axios.get(BASE_API_URL, axiosRequestConfig);
  }
}

export default new Measurements();
