import { useEffect } from "react";
import { useAuthProvider } from "../context/AuthContext";
import { useRecipe } from "../hooks/useRecipe";
import RecipeCard from "../components/ui/recipe/RecipeCard";
import Layout from "../components/ui/Layout";
import Spinner from "../components/ui/Spinner";

export default function AllRecipes() {
  const { isAuthenticated } = useAuthProvider();
  const { getAllRecipes, recipes, isLoading } = useRecipe();

  useEffect(() => {
    getAllRecipes();
  }, []);

  if (!recipes) {
    return (
      <div className="overflow-hidden">
        <Spinner width={54} height={54} />
      </div>
    );
  }

  return (
    <Layout showNav={true} isAuthenticated={isAuthenticated}>
      <section className="px-4 py-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">¡Benvenido!</h1>
        <p className="text-gray-600 mb-8">Acá podrás ver todas las recetas</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isDeleting={isLoading}
              isAuthenticated={isAuthenticated}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
}
