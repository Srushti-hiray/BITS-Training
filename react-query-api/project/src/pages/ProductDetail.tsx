import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../api/products';
import './ProductDetail.css';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(Number(id))
  });

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error loading product</div>;
  if (!product) return null;

  return (
    <div className="product-detail">
      <button className="back-button" onClick={() => navigate('/')}>
        Back to Products
      </button>
      
      <div className="product-detail-content">
        <img src={product.image} alt={product.title} className="product-image" />
        
        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="product-price">${product.price}</p>
          <p className="product-description">{product.description}</p>
          <div className="rating">
            <span>★ {product.rating.rate}</span>
            <span>({product.rating.count} reviews)</span>
          </div>
          <span className="product-category">{product.category}</span>
        </div>
      </div>
    </div>
  );
};