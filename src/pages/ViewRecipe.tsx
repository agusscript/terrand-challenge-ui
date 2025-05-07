import { useNavigate, useParams } from "react-router-dom";
import { useRecipe } from "../hooks/useRecipe";
import { useEffect } from "react";
import Spinner from "../components/ui/Spinner";
import RecipeDetails from "../components/ui/recipe/RecipeDetails";
import Button from "../components/ui/Button";

export default function ViewRecipe() {
  const { recipe, getOneRecipeById, isLoading } = useRecipe();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getOneRecipeById(id);
    }
  }, [id]);

  if (isLoading || !recipe) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner width={40} height={40} />
      </div>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-6">
      <RecipeDetails recipe={recipe} />
      <div className="pt-8 max-w-40 mx-auto">
        <Button onClick={() => navigate(-1)}>
          Volver
        </Button>
      </div>
    </section>
  );
}
