// components/products/AddToCartButton.tsx
'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { IProduct } from '@/lib/api/interfaces/types';
import { ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AddToCartButtonProps {
  product: IProduct;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Add the product to cart
    addToCart({
      ...product,
      quantity
    });

    // Show success feedback
    setIsAdded(true);

    // Reset after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  if (!product.in_stock) {
    return (
      <Button 
        disabled 
        size="lg" 
        className="w-full"
      >
        Out of Stock
      </Button>
    );
  }

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <label className="font-medium text-sm">Quantity:</label>
        <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="px-6 py-2 border-x border-gray-300 dark:border-gray-700 font-medium">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(
              Math.min(
                product.stockQuantity || 999, 
                quantity + 1
              )
            )}
            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            disabled={product.stockQuantity ? quantity >= product.stockQuantity : false}
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <Button
        onClick={handleAddToCart}
        disabled={isAdded}
        size="lg"
        className="w-full text-base font-semibold"
      >
        {isAdded ? (
          <>
            <Check className="w-5 h-5" />
            Added to Cart!
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </>
        )}
      </Button>

      {/* Success Message */}
      {isAdded && (
        <p className="text-sm text-green-600 dark:text-green-400 text-center animate-in fade-in">
          ✓ Product added to your cart
        </p>
      )}
    </div>
  );
}