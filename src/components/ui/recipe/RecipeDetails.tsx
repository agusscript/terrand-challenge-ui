import { Recipe } from "../../../services/recipeService";
import { BASE_URL } from "../../../constants/constants";
import ImgPlaceholder from "../../../assets/img-placeholder.svg";

interface IRecipeDetailsProps {
  recipe: Recipe;
}

export default function RecipeDetails({ recipe }: IRecipeDetailsProps) {
  const { title, description, ingredients, imagePath, user } = recipe;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
      <div className="w-full h-64 mb-6 overflow-hidden rounded-lg">
        <img
          src={imagePath ? `${BASE_URL}/${imagePath}` : ImgPlaceholder}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = ImgPlaceholder;
          }}
        />
      </div>

      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-gray-700 mb-6">{description}</p>

      <h2 className="text-xl font-semibold mb-2">Ingredientes</h2>
      <ul className="list-disc list-inside text-gray-800 space-y-1">
        {ingredients.map((ingredient, idx) => (
          <li key={idx}>{ingredient}</li>
        ))}
      </ul>

      <div className="mt-10 text-sm text-gray-500 text-left">
        Receta creada por {user.name}
      </div>
    </div>
  );
}
