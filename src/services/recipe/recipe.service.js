import axios from 'axios';
import { axiosRequestConfig } from '../../config/axios-config';

const BASE_API_URL = 'http://localhost:8080/api/recipes';

class RecipeService {
  async getCategories() {
    return axios.get(`${BASE_API_URL}/categories`, axiosRequestConfig);
  }

  async newRecipe(recipe) {
    return axios.post(`${BASE_API_URL}/new`, recipe, axiosRequestConfig);
  }

  async getRecipesAwaitingApproval(page) {
    return axios.get(
      `${BASE_API_URL}/awaiting-approval?size=10&page=${page}&sort=id,asc`,
      axiosRequestConfig
    );
  }
  async getRecipeById(id) {
    return axios.get(`${BASE_API_URL}/${id}`, axiosRequestConfig);
  }
}

export default new RecipeService();
