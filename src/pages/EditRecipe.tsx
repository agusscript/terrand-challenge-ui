import { useRecipe } from "../hooks/useRecipe";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import EditRecipeForm from "../components/ui/recipe/EditRecipeForm";
import Spinner from "../components/ui/Spinner";

export default function EditRecipe() {
  const { updateRecipe, getOneRecipeById, isLoading, recipe } = useRecipe();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      getOneRecipeById(id);
    }
  }, [id]);

  if (!recipe) {
    return (
      <div className="overflow-hidden">
        <Spinner width={54} height={54} />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <EditRecipeForm handleSubmit={updateRecipe} initialRecipe={recipe!} loading={isLoading} />
    </div>
  );
}
