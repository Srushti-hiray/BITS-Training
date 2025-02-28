import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from "@/components/store/cartStore";
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';

export function CartPage() {
  const { items, total, updateQuantity, removeFromCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-gray-500 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button asChild>
            <a href="/products">Browse Products</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center p-4">
                  <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center mr-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-16 max-w-16 object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 text-gray-900"
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    >
                      {/* <Minus className="h-4 w-4 stroke-gray-900" /> */}
                      ➖
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      ➕
                      {/* <Plus className="h-6 w-6 stroke-gray-900" /> */}
                    </Button>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 p-0 h-auto mt-1"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      <span className="text-xs">Remove</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700">
                  Checkout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}