import { Product } from '../types/product';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <div className="product-card" onClick={onClick}>
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p className="price">${product.price}</p>
      <div className="rating">
        <span>★ {product.rating.rate}</span>
        <span>({product.rating.count} reviews)</span>
      </div>
    </div>
  );
};