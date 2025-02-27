import axios from 'axios';
import { Product, ProductFormData } from '@/types/product';

const API_URL = 'https://fakestoreapi.com';

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const getProductsSorted = async (sort: 'asc' | 'desc'): Promise<Product[]> => {
  const response = await axios.get(`${API_URL}/products?sort=${sort}`);
  return response.data;
};

export const getProduct = async (id: number): Promise<Product> => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const response = await axios.get(`${API_URL}/products/category/${category}`);
  return response.data;
};

export const getCategories = async (): Promise<string[]> => {
  const response = await axios.get(`${API_URL}/products/categories`);
  return response.data;
};

export const addProduct = async (product: ProductFormData): Promise<Product> => {
  const response = await axios.post(`${API_URL}/products`, product);
  return response.data;
};

export const updateProduct = async (id: number, product: ProductFormData): Promise<Product> => {
  const response = await axios.put(`${API_URL}/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<Product> => {
  const response = await axios.delete(`${API_URL}/products/${id}`);
  return response.data;
};