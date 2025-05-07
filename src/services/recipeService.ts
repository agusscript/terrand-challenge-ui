import { api } from "./api"

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  imagePath: string;
  userId: string;
  deletedAt: string;
}

export const recipeService = {
  getAll: async (): Promise<Recipe[]> => {
    const response = await api.get("/recipe");
    return response.data;
  },

  getOneById: async (id: string): Promise<Recipe> => {
    const response = await api.get(`/recipe/${id}`);
    return response.data;
  },

  getAllByUserId: async (): Promise<Recipe[]> => {
    const response = await api.get("/recipe/mine");
    return response.data;
  },

  create: async (recipeData: FormData): Promise<Recipe> => {
    const response = await api.post("/recipe", recipeData);
    return response.data;
  },

  update: async (id: string, recipeData: FormData): Promise<Recipe> => {
    const response = await api.patch(`/recipe/${id}`, recipeData);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/recipe/${id}`);
  },
}
