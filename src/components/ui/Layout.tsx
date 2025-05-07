import type { ReactNode } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthProvider } from "../../context/AuthContext"
import Button from "./Button"

interface ILayoutProps {
  children: ReactNode
  showNav?: boolean
  isAuthenticated?: boolean
}

export default function Layout({ children, showNav = true, isAuthenticated = false }: ILayoutProps) {
  const { logout } = useAuthProvider();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  }

  return (
    <div className="container flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 w-full border-b border-[#34495e50] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold">Recetas App</span>
            </Link>
          </div>
          {showNav && (
            <div className="flex flex-1 items-center justify-end space-x-4">
              <nav className="flex items-center space-x-2">
                {isAuthenticated ? (
                  <>
                    <Link to="/recipe/create">
                      <Button>
                        Nueva Receta
                      </Button>
                    </Link>
                    <Link to="/">
                      <Button onClick={handleLogout}>
                        Cerrar Sesión
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button>
                        Iniciar Sesión
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button>Registrarse</Button>
                    </Link>
                  </>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>
      <main className="flex-1 py-6">{children}</main>
      <footer className="border-t border-[#34495e50] py-6 md:py-0">
        <div className="flex flex-col items-center justify-center gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            &copy; 2025 Recetas App - Terrand Full Stack challenge.
          </p>
        </div>
      </footer>
    </div>
  );
}
