import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from '@/components/Navbar';
import { HomePage } from '@/pages/HomePage';
import { ProductsPage } from '@/pages/ProductsPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { AddProductPage } from '@/pages/AddProductPage';
import { CartPage } from '@/pages/CartPage';
import { UserPage } from '@/pages/UserPage';
import { LoginPage } from '@/pages/LoginPage';
import { ProductProvider } from '@/context/ProductContext';
import { Toaster } from '@/components/ui/toaster';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <ProductProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 w-full">
              <Navbar />
              <main className="w-full">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/add" element={<AddProductPage />} />
                  <Route path="/products/:id" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/user" element={<UserPage />} />
                  <Route path="/login" element={<LoginPage />} />
                </Routes>
              </main>
              <Toaster />
            </div>
          </Router>
        </ProductProvider>
    </QueryClientProvider>
  );
}

export default App;