import CreateRecipeForm from "../components/ui/recipe/CreateRecipeForm";
import { useRecipe } from "../hooks/useRecipe";

export default function CreateRecipe() {
  const { createRecipe, isLoading } = useRecipe();

  return (
    <div className="flex-1 overflow-auto">
      <CreateRecipeForm handleSubmit={createRecipe} loading={isLoading} />
    </div>
  );
}
