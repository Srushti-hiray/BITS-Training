import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ArrowLeft, Trash, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  const handleRemoveFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getProductDetails = (productId: number) => {
    return state.products.find((p) => p.id === productId);
  };

  const calculateTotal = () => {
    return state.cart?.products.reduce((total, item) => {
      const product = getProductDetails(item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  if (!state.cart || state.cart.products.length === 0) {
    return (
      <div className="container">
        <button className="btn" onClick={() => navigate(-1)} style={{ margin: '20px 0' }}>
          <ArrowLeft />
          Back
        </button>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <ShoppingBag size={64} />
          <h2>Your cart is empty</h2>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/user')}
            style={{ marginTop: '20px' }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <button className="btn" onClick={() => navigate(-1)} style={{ margin: '20px 0' }}>
        <ArrowLeft />
        Back
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Shopping Cart</h1>
        <button className="btn btn-danger" onClick={handleClearCart}>
          Clear Cart
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        {state.cart.products.map((item, index) => {
          const product = getProductDetails(item.productId);
          if (!product) return null;

          return (
            <div key={`${item.productId}-${index}`} className="cart-item">
              <img
                src={product.image}
                alt={product.title}
                style={{ width: '100px', height: '100px', objectFit: 'contain' }}
              />
              <div style={{ flex: 1 }}>
                <h3>{product.title}</h3>
                <p>${product.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => handleRemoveFromCart(item.productId)}
              >
                <Trash />
                Remove
              </button>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          borderTop: '1px solid #ddd',
          textAlign: 'right',
        }}
      >
        <h2>Total: ${calculateTotal()?.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default Cart;