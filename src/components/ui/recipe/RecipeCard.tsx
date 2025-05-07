import { Link } from "react-router-dom"
import { Recipe } from "../../../services/recipeService"
import { BASE_URL } from "../../../constants/constants";
import ImgPlaceholder from "../../../assets/img-placeholder.svg";
import Spinner from "../Spinner";

interface IRecipeCardProps {
  recipe: Recipe;
  isDeleting: boolean;
  isAuthenticated: boolean;
  onDelete?: (id: string) => void;
}

export default function RecipeCard({
  recipe,
  isDeleting,
  isAuthenticated,
  onDelete
}: IRecipeCardProps) {
  const { id, title, description, ingredients, imagePath } = recipe;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col transition hover:shadow-lg">
      <div className="w-full h-48 overflow-hidden">
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

      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h2 className="text-xl font-semibold mb-1">{title}</h2>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>

          <h3 className="text-sm font-medium text-gray-700">Ingredientes:</h3>
          <ul className="text-sm text-gray-600 list-disc list-inside">
            {ingredients.slice(0, 3).map((ingredient, index) => (
              <li key={index} className="truncate">{ingredient}</li>
            ))}
            {ingredients.length > 3 && (
              <li className="text-gray-500">
                y {ingredients.length - 3} más...
              </li>
            )}
          </ul>
        </div>

        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
          <Link to={`/recipe/${id}`} className="text-[#0e6655] hover:text-[#0e6654c9] text-sm font-medium">
            Ver receta
          </Link>

          {isAuthenticated && onDelete && (
            <div className="flex gap-3">
              <Link to={`/recipe/edit/${id}`} className="text-blue-700 hover:text-blue-500 text-sm">
                Editar
              </Link>
              <button
                onClick={() => onDelete(id)}
                disabled={isDeleting}
                className="text-red-500 hover:text-red-700 text-sm disabled:opacity-50 cursor-pointer"
              >
                {isDeleting ? <Spinner width={20} height={20} /> : "Eliminar"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
