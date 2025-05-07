import * as Yup from "yup";

export const registerSchema = Yup.object({
  name: Yup.string()
    .required("El nombre es obligatorio")
    .min(2, "El nombre debe tener al menos 2 caracteres"),

  lastName: Yup.string()
    .required("El apellido es obligatorio")
    .min(2, "El apellido debe tener al menos 2 caracteres"),

  email: Yup.string()
    .email("Debe ser un email válido")
    .required("El email es obligatorio"),

  password: Yup.string()
    .required("La contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Las contraseñas no coinciden")
    .required("Debes confirmar tu contraseña"),
});
