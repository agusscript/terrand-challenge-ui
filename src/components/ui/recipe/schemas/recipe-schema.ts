import * as Yup from "yup";

export const recipeSchema = Yup.object({
  title: Yup.string()
    .required("El título es obligatorio")
    .min(2, "Debe tener al menos 2 caracteres"),

  description: Yup.string()
    .required("La descripción es obligatoria")
    .min(6, "Debe tener al menos 6 caracteres"),

  ingredients: Yup.array()
    .of(Yup.string().required("Los ingredientes son obligatorios"))
    .min(1, "Debes agregar al menos un ingrediente"),
});
