// ProductCard.tsx
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Product } from '@/types/product';
import { useCartStore } from "@/components/store/cartStore";
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartStore();
  const { toast } = useToast();
  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: 'Added to cart',
      description: `${product.title} has been added to your cart.`,
    });
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
      <Link to={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-gray-100 p-6 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain h-64 w-full transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg line-clamp-1 hover:text-indigo-600 transition-colors">
            {product.title}
          </h3>
        </Link>
        {product.rating && (
          <div className="flex items-center mt-2 space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating.rate}</span>
            <span className="text-sm text-gray-500">({product.rating.count} reviews)</span>
          </div>
        )}
        <p className="mt-2 font-bold text-lg">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-indigo-600 hover:bg-indigo-700"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}