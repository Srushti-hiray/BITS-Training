import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import { useAppContext } from './context/AppContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { state } = useAppContext();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/user/*"
        element={
          <ProtectedRoute isAllowed={!!state.user && !state.user.isAdmin}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute isAllowed={!!state.user && state.user.isAdmin}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/product/:id"
        element={
          <ProtectedRoute isAllowed={!!state.user}>
            <ProductDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute isAllowed={!!state.user && !state.user.isAdmin}>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;