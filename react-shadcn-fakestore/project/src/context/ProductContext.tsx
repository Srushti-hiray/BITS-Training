import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Product, ProductFormData } from '@/types/product';
import { getProducts } from '@/api/products';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

type ProductAction =
  | { type: 'FETCH_PRODUCTS_START' }
  | { type: 'FETCH_PRODUCTS_SUCCESS'; payload: Product[] }
  | { type: 'FETCH_PRODUCTS_ERROR'; payload: string }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: number };

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const productReducer = (state: ProductState, action: ProductAction): ProductState => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_PRODUCTS_SUCCESS':
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case 'FETCH_PRODUCTS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload),
      };
    default:
      return state;
  }
};

interface ProductContextType extends ProductState {
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  refreshProducts: () => Promise<void>;
  getProductById: (id: number) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const fetchProducts = async () => {
    dispatch({ type: 'FETCH_PRODUCTS_START' });
    try {
      const products = await getProducts();
      dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: products });
    } catch (error) {
      dispatch({
        type: 'FETCH_PRODUCTS_ERROR',
        payload: 'Failed to fetch products',
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = (product: Product) => {
    dispatch({ type: 'ADD_PRODUCT', payload: product });
  };

  const updateProduct = (product: Product) => {
    dispatch({ type: 'UPDATE_PRODUCT', payload: product });
  };

  const deleteProduct = (id: number) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: id });
  };

  const refreshProducts = async () => {
    await fetchProducts();
  };

  const getProductById = (id: number) => {
    return state.products.find(product => product.id === id);
  };

  return (
    <ProductContext.Provider
      value={{
        ...state,
        addProduct,
        updateProduct,
        deleteProduct,
        refreshProducts,
        getProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};