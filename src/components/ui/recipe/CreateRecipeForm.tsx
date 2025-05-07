import { Form, Formik } from "formik";
import { recipeSchema } from "./schemas/recipe-schema";
import { Recipe } from "../../../services/recipeService";
import { useState } from "react";
import AuthInput from "../auth/AuthInput";
import AuthButton from "../auth/AuthButton";
import UploadImageInput from "./UploadImageInput";
import MultiInputField from "./MultiInputField";
import buildRecipeFormData from "../../../utils/buildRecipeFormData";

interface ICreateRecipeFormProps {
  handleSubmit: (formData: FormData) => Promise<Recipe>;
  loading: boolean;
};

export default function CreateRecipeForm({ handleSubmit, loading }: ICreateRecipeFormProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const initialValues = {
    title: "",
    description: "",
    ingredients: [],
  };

  return (
    <div className="max-w-md mx-auto my-8 p-8 px-8 w-full border border-[#34495e50] rounded-md">
      <Formik
        initialValues={initialValues}
        validationSchema={recipeSchema}
        onSubmit={(values) => {
          const formData = buildRecipeFormData(values, selectedImage);
          handleSubmit(formData);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <h1 className="text-4xl font-bold text-center mb-8">Crear Nueva Receta</h1>

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

            <UploadImageInput onFileSelect={setSelectedImage} />

            <div className="pt-1">
              <AuthButton isLoading={loading}>
                Crear Receta
              </AuthButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
