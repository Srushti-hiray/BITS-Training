import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getProducts, getProductsByCategory, getCategories } from '../api/products';
import { ProductCard } from '../components/ProductCard';
import './ProductList.css';

export const ProductList = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () => selectedCategory ? getProductsByCategory(selectedCategory) : getProducts()
  });

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error loading products</div>;

  return (
    <div className="product-list">
      <div className="filters">
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories?.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="products-grid">
        {products?.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => navigate(`/product/${product.id}`)}
          />
        ))}
      </div>
    </div>
  );
};