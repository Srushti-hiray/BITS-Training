import { Link } from 'react-router-dom';
import { ShoppingCart, Package, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

export function Navbar() {
  const { items } = useCart();
  const cartItemCount = items.length;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Package className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Lets Grab🛒</span>
            </Link>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-4">
            <Link to="/products">
              <Button variant="ghost" className="flex items-center space-x-1 px-2 sm:px-4">
                <Package className="h-5 w-5" />
                <span className="hidden sm:inline">Products</span>
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" className="flex items-center space-x-1 px-2 sm:px-4 relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="hidden sm:inline">Cart</span>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/user">
              <Button variant="ghost" className="flex items-center space-x-1 px-2 sm:px-4">
                <User className="h-5 w-5" />
                <span className="hidden sm:inline">User</span>
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" className="flex items-center space-x-1 px-2 sm:px-4">
                <LogIn className="h-5 w-5" />
                <span className="hidden sm:inline">Login</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}