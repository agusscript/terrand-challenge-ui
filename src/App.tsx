import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import CreateRecipe from './pages/CreateRecipe';
import EditRecipe from './pages/EditRecipe';
import AllRecipes from './pages/AllRecipes';
import ViewRecipe from './pages/ViewRecipe';

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipe/all" element={<AllRecipes />} />
        <Route path="/recipe/:id" element={<ViewRecipe />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/recipe/create" element={<CreateRecipe />} />
          <Route path="/recipe/edit/:id" element={<EditRecipe />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
