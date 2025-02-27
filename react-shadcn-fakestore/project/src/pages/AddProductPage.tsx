import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { addProduct } from '@/api/products';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductForm } from '@/components/ProductForm';
import { ProductFormData } from '@/types/product';
import { useToast } from '@/hooks/use-toast';
import { useProducts } from '@/context/ProductContext';

export function AddProductPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addProduct: addProductToContext } = useProducts();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addProductMutation = useMutation({
    mutationFn: (data: ProductFormData) => addProduct(data),
    onSuccess: (newProduct) => {
      // Add the new product to the context
      addProductToContext(newProduct);
      
      // Show success toast
      toast({
        title: 'Product added',
        description: 'The product has been added successfully.',
      });
      
      // Navigate to the product detail page
      navigate(`/products/${newProduct.id}`);
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to add the product. Please try again.',
        variant: 'destructive',
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    }
  });

  const handleSubmit = (data: ProductFormData) => {
    setIsSubmitting(true);
    addProductMutation.mutate(data);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Add New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductForm 
              onSubmit={handleSubmit} 
              isSubmitting={isSubmitting} 
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}