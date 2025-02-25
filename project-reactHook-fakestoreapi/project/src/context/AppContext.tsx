import React, { createContext, useContext, useReducer } from 'react';
import { AppState, AppAction } from '../types';

const initialState: AppState = {
  products: [],
  cart: null,
  user: null,
  loading: false,
  error: null,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({ state: initialState, dispatch: () => null });

export const useAppContext = () => useContext(AppContext);

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'SET_CART':
      return { ...state, cart: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'CLEAR_CART':
      return { ...state, cart: null };
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: state.cart
          ? {
              ...state.cart,
              products: [...state.cart.products, action.payload],
            }
          : {
              id: Date.now(),
              userId: 1,
              date: new Date().toISOString(),
              products: [action.payload],
            },
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart
          ? {
              ...state.cart,
              products: state.cart.products.filter(
                (item) => item.productId !== action.payload
              ),
            }
          : null,
      };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};