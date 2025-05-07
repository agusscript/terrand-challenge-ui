import { Form, Formik } from "formik";
import { registerSchema } from "./schemas/register-schema";
import { RegisterData } from "../../../context/AuthContext";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import AuthSuggestion from "./AuthSuggestion";

interface IRegisterFormProps {
  handleSubmit: (registerData: RegisterData) => Promise<void>;
  loading: boolean;
};

export default function RegisterForm({ handleSubmit, loading }: IRegisterFormProps) {
  const initialValues = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <div className="max-w-md mx-auto my-8 p-8 px-8 w-full border border-[#34495e50] rounded-md">
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={({
          name,
          lastName,
          email,
          password,
        }) => handleSubmit({ name, lastName, email, password })}
      >
        {({ errors, touched }) => (
          <Form>
            <h1 className="text-4xl font-bold mx-18 text-center mb-8">Registrarse</h1>
            <div className="flex flex-col gap-1">
              <AuthInput
                label="Nombre"
                name="name"
                type="text"
                placeholder="German"
                error={!!errors.name}
                touched={touched.name}
              />
              <AuthInput
                label="Apellido"
                name="lastName"
                type="text"
                placeholder="Beder"
                error={!!errors.lastName}
                touched={touched.lastName}
              />
              <AuthInput
                label="Email"
                name="email"
                type="email"
                placeholder="usuario@gmail.com"
                error={!!errors.email}
                touched={touched.email}
              />
              <AuthInput
                label="Contraseña"
                name="password"
                type="password"
                placeholder="••••••••••••"
                error={!!errors.password}
                touched={touched.password}
              />
              <AuthInput
                label="Confirmar Contraseña"
                name="confirmPassword"
                type="password"
                placeholder="••••••••••••"
                error={!!errors.confirmPassword}
                touched={touched.confirmPassword}
              />
            </div>
            <div className="pt-5">
              <AuthButton isLoading={loading}>
                Registrarse
              </AuthButton>
              <AuthSuggestion
                text="¿Ya tienes una cuenta?"
                linkName="Iniciar Sesión"
                redirectTo="/login"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
