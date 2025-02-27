import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/api/products';
import { ProductGrid } from '@/components/ProductGrid';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useProducts } from '@/context/ProductContext';

type SortOption = 'default' | 'price-asc' | 'price-desc';

export function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const { products, loading } = useProducts();

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  // Filter products by category
  const filteredByCategory = activeCategory
    ? products?.filter((product) => product.category === activeCategory)
    : products;

  // Sort products by price
  const sortedProducts = filteredByCategory
    ? [...filteredByCategory].sort((a, b) => {
        if (sortOption === 'price-asc') {
          return a.price - b.price;
        } else if (sortOption === 'price-desc') {
          return b.price - a.price;
        }
        return 0;
      })
    : filteredByCategory;

  const handleSortChange = (value: string) => {
    setSortOption(value as SortOption);
  };

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value === 'all' ? null : value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Products</h1>
        <Link to="/products/add">
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="h-5 w-5 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        {categoriesLoading ? (
          <div className="h-10 bg-gray-200 animate-pulse rounded w-full md:w-1/2"></div>
        ) : (
          <div className="w-full md:w-auto">
            <Select value={activeCategory || 'all'} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories?.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="w-full md:w-auto">
          <Select value={sortOption} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ProductGrid products={sortedProducts || []} isLoading={loading} />
    </div>
  );
}