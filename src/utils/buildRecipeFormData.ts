interface IRecipeFormValues {
  title: string;
  description: string;
  ingredients: string[];
}

export default function buildRecipeFormData(
  values: IRecipeFormValues,
  image: File | null
): FormData {
  const formData = new FormData();
  formData.append("title", values.title);
  formData.append("description", values.description);
  values.ingredients.forEach((ingredient, i) =>
    formData.append(`ingredients[${i}]`, ingredient)
  );

  if (image) {
    formData.append("image", image);
  }

  return formData;
}
