import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAppContext } from '../context/AppContext';
import { getProducts, getCategories, getProductsByCategory, getSortedProducts } from '../api';
import { Product } from '../types';
import { ShoppingCart, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await getCategories();
      return response.data;
    },
    staleTime:30000,
  });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', selectedCategory, sortOrder],
    queryFn: async () => {
      let response;
      if (selectedCategory) {
        response = await getProductsByCategory(selectedCategory);
      } else {
        response = await getSortedProducts(sortOrder);
      }
      
      const sortedProducts = [...response.data].sort((a, b) => {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      });
      
      return sortedProducts;
    },
    staleTime:30000,
   

  });

  React.useEffect(() => {
    if (products.length > 0) {
      dispatch({ type: 'SET_PRODUCTS', payload: products });
    }
  }, [products, dispatch]);

  const handleLogout = () => {
    dispatch({ type: 'SET_USER', payload: null });
    navigate('/login');
  };

  const handleAddToCart = (product: Product) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { productId: product.id, quantity: 1 },
    });
    alert('Product added to cart successfully!');
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <header className="header">
        <nav className="nav">
          <h1>Welcome, {state.user?.username}</h1>
          <div className="nav-links">
            <button className="btn" onClick={() => navigate('/cart')}>
              <ShoppingCart />
              Cart ({state.cart?.products.length || 0})
            </button>
            <button className="btn btn-danger" onClick={handleLogout}>
              <LogOut />
              Logout
            </button>
          </div>
        </nav>
      </header>

      <div style={{ margin: '20px 0' }}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ marginRight: '10px' }}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                View Details
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;