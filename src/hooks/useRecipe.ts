import { Recipe, recipeService } from "../services/recipeService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

export function useRecipe() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getAllRecipes = async () => {
    setIsLoading(true);

    try {
      const data = await recipeService.getAll();
      setRecipes(data);
    } catch (err: any) {
      toast.error(err.message || "Error al obtener las recetas");
    } finally {
      setIsLoading(false);
    }
  };

  const getOneRecipeById = async (id: string) => {
    setIsLoading(true);

    try {
      const data = await recipeService.getOneById(id);
      setRecipe(data);
    } catch (err: any) {
      toast.error(err.message || "Error al obtener la receta");
    } finally {
      setIsLoading(false);
    }
  };

  const getAllRecipesByUserId = async () => {
    setIsLoading(true);

    try {
      const data = await recipeService.getAllByUserId();
      setRecipes(data);
    } catch (err: any) {
      toast.error(err.message || "Error al obtener sus recetas");
    } finally {
      setIsLoading(false);
    }
  };

  const createRecipe = async (recipeData: FormData) => {
    setIsLoading(true);

    try {
      const newRecipe = await recipeService.create(recipeData);
      setRecipes(prev => [...prev, newRecipe]);
      toast.success("Nueva receta creada correctamente!");
      navigate('/dashboard');
      return newRecipe;
    } catch (err: any) {
      toast.error(err.message || "Error al crear la receta");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateRecipe = async (id: string, recipeData: FormData) => {
    setIsLoading(true);
  
    try {
      const updatedRecipe = await recipeService.update(id, recipeData);

      setRecipes(prev =>
        prev.map(r => (r.id === id ? updatedRecipe : r))
      );

      toast.success("Receta actualizada correctamente!");
      navigate('/dashboard');
      return updatedRecipe;
    } catch (err: any) {
      toast.error(err.message || "Error al actualizar la receta");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRecipe = async (id: string) => {
    setIsLoading(true);

    try {
      await recipeService.delete(id);
      setRecipes(prev => prev.filter(r => r.id !== id));
      toast.success("Receta eliminada correctamente!");
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.message || "Error al eliminar la receta");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    recipes,
    recipe,
    isLoading,
    getAllRecipes,
    getOneRecipeById,
    getAllRecipesByUserId,
    createRecipe,
    updateRecipe,
    deleteRecipe,
  };
}
