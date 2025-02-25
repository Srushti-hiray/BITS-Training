import axios from 'axios';
import { Product, Cart } from '../types';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

export const getProducts = () => api.get<Product[]>('/products');

export const getProduct = (id: number) => api.get<Product>(`/products/${id}`);

export const getCategories = () => api.get<string[]>('/products/categories');

export const getProductsByCategory = (category: string) =>api.get<Product[]>(`/products/category/${category}`);

export const getSortedProducts = (sort: 'asc' | 'desc') =>api.get<Product[]>(`/products?sort=${sort}`);

export const login = (username: string, password: string) =>api.post('/auth/login', { username, password });

export const addProduct = (product: Omit<Product, 'id'>) =>api.post<Product>('/products', product);

export const updateProduct = (id: number, product: Partial<Product>) =>api.put<Product>(`/products/${id}`, product);

export const deleteProduct = (id: number) => api.delete(`/products/${id}`);

export const getCarts = () => api.get<Cart[]>('/carts');

export const getSortedCarts = (sort: 'asc' | 'desc') =>api.get<Cart[]>(`/carts?sort=${sort}`);

export const addToCart = (cart: Omit<Cart, 'id'>) =>api.post<Cart>('/carts', cart);

export const updateCart = (id: number, cart: Partial<Cart>) =>api.put<Cart>(`/carts/${id}`, cart);

export const deleteCart = (id: number) => api.delete(`/carts/${id}`);