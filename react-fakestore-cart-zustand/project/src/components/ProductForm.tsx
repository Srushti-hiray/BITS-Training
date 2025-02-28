import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product, ProductFormData } from '@/types/product';

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: ProductFormData) => void;
  isSubmitting: boolean;
}

export function ProductForm({ product, onSubmit, isSubmitting }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    title: product?.title || '',
    price: product?.price || 0,
    description: product?.description || '',
    category: product?.category || '',
    image: product?.image || '',
    rating: product?.rating || { rate: 0, count: 0 },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          name="price"
          type="number"
          step="0.01"
          value={formData.price.toString()}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.category}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="jewelery">Jewelery</SelectItem>
            <SelectItem value="men's clothing">Men's Clothing</SelectItem>
            <SelectItem value="women's clothing">Women's Clothing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
      </Button>
    </form>
  );
}