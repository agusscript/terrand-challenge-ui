import { useAuthProvider } from "../context/AuthContext";
import RegisterForm from "../components/ui/auth/RegisterForm";

export default function Register() {
  const { register, isLoading } = useAuthProvider();

  return (
    <div className="flex-1 overflow-auto">
      <RegisterForm handleSubmit={register} loading={isLoading} />
    </div>
  );
}
