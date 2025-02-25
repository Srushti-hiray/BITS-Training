import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../api';
import { Product } from '../types';
import { LogOut, Plus, Edit, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: { rate: 0, count: 0 },
  });

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const response = await getProducts();
        dispatch({ type: 'SET_PRODUCTS', payload: response.data });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch products' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };
    fetchProducts();
  }, [dispatch]);

  const handleLogout = () => {
    dispatch({ type: 'SET_USER', payload: null });
    navigate('/login');
  };

  const handleAddProduct = async () => {
    try {
      const response = await addProduct(newProduct);
      dispatch({ type: 'ADD_PRODUCT', payload: response.data });
      alert('Product added successfully!');
      setNewProduct({
        title: '',
        price: 0 ,
        description: '',
        category: '',
        image: '',
        rating: { rate: 0, count: 0 },
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add product' });
    }
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;
    try {
      const response = await updateProduct(editingProduct.id, editingProduct);
      dispatch({ type: 'UPDATE_PRODUCT', payload: response.data });
      alert('Product updated successfully!');
      setEditingProduct(null);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update product' });
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProduct(id);
      dispatch({ type: 'DELETE_PRODUCT', payload: id });
      alert('Product deleted successfully!');
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete product' });
    }
  };

  if (state.loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <header className="header">
        <nav className="nav">
          <h1>Admin Dashboard</h1>
          <button className="btn btn-danger" onClick={handleLogout}>
            <LogOut />
            Logout
          </button>
        </nav>
      </header>

      <div style={{ margin: '20px 0' }}>
        <h2>Add New Product</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Title"
            value={newProduct.title}
            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
            
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          />
          <button className="btn btn-primary" onClick={handleAddProduct}>
            <Plus />
            Add Product
          </button>
        </div>
      </div>

      <div className="product-grid">
        {state.products.map((product) => (
          <div key={product.id} className="product-card">
            {editingProduct?.id === product.id ? (
              <div className="form-group">
                <input
                  type="text"
                  value={editingProduct.title}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, title: e.target.value })
                  }
                />
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: Number(e.target.value),
                    })
                  }
                />
                <button className="btn btn-primary" onClick={handleUpdateProduct}>
                  Save
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => setEditingProduct(null)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <img src={product.image} alt={product.title} className="product-image" />
                <h3>{product.title}</h3>
                <p>${product.price}</p>
                <p>Category: {product.category}</p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => setEditingProduct(product)}
                  >
                    <Edit />
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;