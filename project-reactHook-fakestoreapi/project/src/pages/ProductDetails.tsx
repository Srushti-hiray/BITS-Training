import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { getProduct } from '../api';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch } = useAppContext();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct(Number(id));
        setProduct(response.data);
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch product details' });
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, dispatch]);

  const handleAddToCart = () => {
    if (product) {
      dispatch({
        type: 'ADD_TO_CART',
        payload: { productId: product.id, quantity: 1 },
      });
      alert('Product added successfully!');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container">
      <button className="btn" onClick={() => navigate(-1)} style={{ margin: '20px 0' }}>
        <ArrowLeft />
        Back
      </button>

      <div style={{ display: 'flex', gap: '40px', padding: '20px' }}>
        <div style={{ flex: 1 }}>
          <img
            src={product.image}
            alt={product.title}
            style={{ width: '100%', maxWidth: '500px', objectFit: 'contain' }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '2em', marginBottom: '20px' }}>{product.title}</h1>
          <p style={{ fontSize: '1.5em', color: 'var(--primary-color)', marginBottom: '20px' }}>
            ${product.price}
          </p>
          <p style={{ marginBottom: '20px' }}>{product.description}</p>
          <p style={{ marginBottom: '20px' }}>
            Category: <span style={{ color: 'var(--primary-color)' }}>{product.category}</span>
          </p>
          <div style={{ marginBottom: '20px' }}>
            <p>Rating ⭐: {product.rating.rate} / 5</p>
            <p>({product.rating.count} reviews)</p>
          </div>
          <button className="btn btn-primary" onClick={handleAddToCart}>
            <ShoppingCart />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;