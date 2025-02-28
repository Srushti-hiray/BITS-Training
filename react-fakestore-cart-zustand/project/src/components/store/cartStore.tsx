import {create} from 'zustand';
import { Product } from '@/types/product';
import { persist } from 'zustand/middleware';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const useCartStore = create(
  persist<CartState>(
    (set) => ({
      items: [],
      total: 0,
      addToCart: (product) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex((item) => item.id === product.id);
          let updatedItems: CartItem[];

          if (existingItemIndex >= 0) {
            updatedItems = state.items.map((item, index) =>
              index === existingItemIndex
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            updatedItems = [...state.items, { ...product, quantity: 1 }];
          }

          return {
            items: updatedItems,
            total: calculateTotal(updatedItems),
          };
        });
      },
      removeFromCart: (id) => {
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== id);
          return {
            items: updatedItems,
            total: calculateTotal(updatedItems),
          };
        });
      },
      updateQuantity: (id, quantity) => {
        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          );
          return {
            items: updatedItems,
            total: calculateTotal(updatedItems),
          };
        });
      },
      clearCart: () => {
        set({ items: [], total: 0 });
      },
    }),
    {
      name: 'cart-storage', 
      
    }
  )
);