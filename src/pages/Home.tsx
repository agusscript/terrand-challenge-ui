import { useAuthProvider } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Layout from "../components/ui/Layout";
import Button from "../components/ui/Button";

export default function Home() {
  const { isAuthenticated } = useAuthProvider();

  return (
    <Layout showNav={true} isAuthenticated={isAuthenticated}>
      <section className="w-full py-16 bg-gray-50">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl mb-4">
            Comparte tus recetas favoritas
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-6">
            Crea, guarda y compartí tus mejores recetas con amigos, familiares o toda la comunidad.
          </p>
          <div className="flex gap-2 items-center justify-center m-auto">
            <Link to="/recipe/all">
              <Button>Explorar Recetas</Button>
            </Link>
            <Link to="/recipe/create">
              <Button>Publicar Receta</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
