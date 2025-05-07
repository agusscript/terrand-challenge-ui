import { useAuthProvider } from "../context/AuthContext";
import LoginForm from "../components/ui/auth/LoginForm";

export default function Login() {
	const { login, isLoading } = useAuthProvider();

	return (
		<div className="flex-1 overflow-auto">
			<LoginForm handleSubmit={login} loading={isLoading} />
		</div>
	);
}
