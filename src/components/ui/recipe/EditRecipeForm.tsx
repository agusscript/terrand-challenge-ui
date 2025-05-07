import { Form, Formik } from "formik";
import { recipeSchema } from "./schemas/recipe-schema";
import { Recipe } from "../../../services/recipeService";
import { BASE_URL } from "../../../constants/constants";
import { useState } from "react";
import AuthInput from "../auth/AuthInput";
import AuthButton from "../auth/AuthButton";
import UploadImageInput from "./UploadImageInput";
import MultiInputField from "./MultiInputField";
import buildRecipeFormData from "../../../utils/buildRecipeFormData";
import ImgPlaceholder from "../../../assets/img-placeholder.svg"

interface IEditRecipeFormProps {
  initialRecipe: Recipe;
  handleSubmit: (id: string, formData: FormData) => Promise<Recipe>;
  loading: boolean;
}

export default function EditRecipeForm({
  initialRecipe,
  handleSubmit,
  loading
}: IEditRecipeFormProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { id, title, description, ingredients, imagePath } = initialRecipe;

  const initialValues = {
    title: title || "",
    description: description || "",
    ingredients: ingredients || [],
  };

  return (
    <div className="max-w-md mx-auto my-8 p-8 px-8 w-full border border-[#34495e50] rounded-md">
      <Formik
        initialValues={initialValues}
        validationSchema={recipeSchema}
        onSubmit={(values) => {
          const formData = buildRecipeFormData(values, selectedImage);
          handleSubmit(id, formData);
        }}
        enableReinitialize
      >
        {({ errors, touched }) => (
          <Form>
            <h1 className="text-4xl font-bold text-center mb-8">Editar Receta</h1>

            <div className="flex flex-col gap-1">
              <AuthInput
                label="Titulo"
                name="title"
                type="text"
                placeholder="Pollo al curry"
                error={!!errors.title}
                touched={touched.title}
              />

              <AuthInput
                label="Descripción"
                name="description"
                type="text"
                placeholder="Receta ideal para 4 personas"
                error={!!errors.description}
                touched={touched.description}
              />
            </div>

            <MultiInputField
              name="ingredients"
              title="Ingredientes"
              label="ingrediente"
              placeholder="100 gramos de queso"
            />

            <div className="mb-4">
              <label className="text-sm text-gray-600">Imagen actual:</label>
              <div className="w-full h-48 rounded-lg overflow-hidden mt-1">
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
            </div>

            <UploadImageInput onFileSelect={setSelectedImage} />

            <div className="pt-1">
              <AuthButton isLoading={loading}>
                Actualizar Receta
              </AuthButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
