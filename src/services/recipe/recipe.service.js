import axios from 'axios';
import { axiosRequestConfig } from '../../config/axios-config';

const BASE_API_URL = 'http://localhost:8080/api/recipes';

class RecipeService {
  async getCategories() {
    return axios.get(`${BASE_API_URL}/categories`, axiosRequestConfig);
  }

  async deleteRecipeById(id) {
    return axios.delete(`${BASE_API_URL}/delete/${id}`, axiosRequestConfig);
  }
  async newRecipe(recipe) {
    return axios.post(`${BASE_API_URL}/new`, recipe, axiosRequestConfig);
  }
  async confirmRecipeById(id) {
    return axios.post(`${BASE_API_URL}/confirm/${id}`, axiosRequestConfig);
  }

  async getPageOfRecipesForCreateDietPlan(page) {
    return axios.get(
      `http://localhost:8080/api/recipes/show?size=4&page=${page}&sort=id,asc`,
      axiosRequestConfig
    );
  }

  async getRecipesAwaitingApproval(page) {
    return axios.get(
      `${BASE_API_URL}/awaiting-approval?size=4&page=${page}&sort=id,asc`,
      axiosRequestConfig
    );
  }

  async getRecipeById(id) {
    return axios.get(`${BASE_API_URL}/${id}`, axiosRequestConfig);
  }

  async createNewRecipeVoteByUserAndRecipe(recipeId, isUpvote) {
    return axios.get(
      `${BASE_API_URL}/vote/${recipeId}?isUpvote=${isUpvote}`,
      axiosRequestConfig
    );
  }
}

export default new RecipeService();
