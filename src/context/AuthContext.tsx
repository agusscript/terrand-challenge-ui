import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { AuthService } from "../services/authService";
import { api } from "../services/api"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
}

interface AuthContextType {
  userData: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  getToken: () => string | null;
  register: (userData: RegisterData) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface RegisterData {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthProvider = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthProvider must be used within an AuthProvider");
  }

  return context;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!AuthService.getToken());
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = AuthService.getToken();
    const storedUser = AuthService.getUser();

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      if (storedUser) {
        setUserData(storedUser);
      }

      setIsAuthenticated(true);
    }

    setIsLoading(false);
  }, []);

  const getToken = () => {
    return AuthService.getToken();
  };

  const register = async (registerData: RegisterData) => {
    setIsLoading(true);
    try {
      await api.post("/auth/sign-up", registerData);
      toast.success('Registro exitoso! Ahora puedes iniciar sesión.');
      navigate('/login');
    } catch (error: any) {
      console.error("Registration failed:", error);
      toast.error(error?.response?.data?.message || 'Error al registrarse.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/sign-in", { email, password });
      const { token, user } = response.data;

      AuthService.setToken(token);
      AuthService.setUser(user);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUserData(user);
      setIsAuthenticated(true);
      toast.success(`Bienvenido de vuelta, ${user.name}!`);
      navigate('/dashboard');
    } catch (error: any) {
      console.error("Login failed:", error);
      toast.error(error?.response?.data?.message || 'Error al iniciar sesión.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  const logout = () => {
    AuthService.clearAuth();

    delete api.defaults.headers.common["Authorization"];

    setUserData(null);
    setIsAuthenticated(false);

    toast.success('Sesión cerrada correctamente.');
    navigate('/');
  }

  return (
    <AuthContext.Provider
      value={{
        userData,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>

  );
}
