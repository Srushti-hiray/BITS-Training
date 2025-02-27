import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { updateProduct as apiUpdateProduct, deleteProduct as apiDeleteProduct } from '@/api/products';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { ProductForm } from '@/components/ProductForm';
import { ShoppingCart, Edit, Trash2, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { ProductFormData } from '@/types/product';
import { useToast } from '@/hooks/use-toast';
import { useProducts } from '@/context/ProductContext';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || '0');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { products, updateProduct: updateContextProduct, deleteProduct: deleteContextProduct, getProductById } = useProducts();
  
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [product, setProduct] = useState(getProductById(productId));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get product from context
    const contextProduct = getProductById(productId);
    if (contextProduct) {
      setProduct(contextProduct);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [productId, products, getProductById]);

  const updateMutation = useMutation({
    mutationFn: (data: ProductFormData) => apiUpdateProduct(productId, data),
    onSuccess: (updatedProduct) => {
      updateContextProduct(updatedProduct);
      setProduct(updatedProduct);
      setIsEditDialogOpen(false);
      toast({
        title: 'Product updated',
        description: 'The product has been updated successfully.',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => apiDeleteProduct(productId),
    onSuccess: () => {
      // Delete product from context
      deleteContextProduct(productId);
      navigate('/products');
      toast({
        title: 'Product deleted',
        description: 'The product has been deleted successfully.',
      });
    },
  });

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast({
        title: 'Added to cart',
        description: `${product.title} has been added to your cart.`,
      });
    }
  };

  const handleUpdateProduct = (data: ProductFormData) => {
    updateMutation.mutate(data);
  };

  const handleDeleteProduct = () => {
    deleteMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-200 rounded mb-4 w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded mb-6 w-1/2"></div>
            <div className="h-24 bg-gray-200 rounded mb-6"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/products')}>Back to Products</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden">
          <div className="md:flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-white p-8 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="object-contain max-h-80 w-auto"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
              {product.rating && (
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 font-medium">{product.rating.rate}</span>
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    ({product.rating.count} reviews)
                  </span>
                </div>
              )}
              <p className="text-3xl font-bold mb-4">${product.price.toFixed(2)}</p>
              <div className="bg-gray-100 px-4 py-2 rounded-lg mb-4">
                <p className="text-sm font-medium">Category</p>
                <p className="capitalize">{product.category}</p>
              </div>
              <div className="text-center mb-6">
                <p className="text-gray-700">{product.description}</p>
              </div>
              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(true)}
                >
                  <Edit className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <ProductForm
            product={product}
            onSubmit={handleUpdateProduct}
            isSubmitting={updateMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProduct}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}