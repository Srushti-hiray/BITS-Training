import { useProducts } from '@/context/ProductContext';
import { ProductGrid } from '@/components/ProductGrid';

export function HomePage() {
  const { products, loading } = useProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Featured Products</h1>
      <ProductGrid products={products || []} isLoading={loading} />
    </div>
  );
}