import { Form, Formik } from "formik";
import { loginSchema } from "./schemas/login-schema";
import AuthInput from "./AuthInput";
import AuthSuggestion from "./AuthSuggestion";
import AuthButton from "./AuthButton";

interface ILoginFormProps {
  handleSubmit: (email: string, password: string) => Promise<void>;
  loading: boolean;
};

export default function LoginForm({ handleSubmit, loading }: ILoginFormProps) {
  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className="max-w-md mx-auto my-8 p-8 px-8 w-full border border-[#34495e50] rounded-md">
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={({ email, password }) => handleSubmit(email, password)}
      >
        {({ errors, touched }) => (
          <Form>
            <h1 className="text-4xl font-bold mx-12 text-center mb-8">Iniciar Sesión</h1>
            <div className="flex flex-col gap-1">
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
            </div>
            <div className="pt-4">
              <AuthButton isLoading={loading}>
                Iniciar sesión
              </AuthButton>
              <AuthSuggestion
                text="¿No tienes una cuenta?"
                linkName="Registrarse"
                redirectTo="/register"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
