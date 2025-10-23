// components/cart/CartDrawer.tsx
'use client';

import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function CartDrawer() {
  const { cart, removeFromCart, updateCartItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const cartTotal = cart.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  // const cartCount = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const handleUpdateQuantity = (itemId: string, currentQty: number, change: number) => {
    const newQty = currentQty + change;
    if (newQty <= 0) {
      removeFromCart(itemId);
    } else {
      updateCartItem(itemId, newQty);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Shopping Cart ({cartCount})
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
            <p className="text-sm text-gray-500 mb-6">
              Add some products to get started!
            </p>
            <Button asChild onClick={() => setIsOpen(false)}>
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    {/* Product Image Placeholder */}
                    <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded flex-shrink-0 flex items-center justify-center">
                      <ShoppingCart className="w-8 h-8 text-gray-400" />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm mb-1 truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500 mb-2">
                        KES {item.price.toLocaleString()}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                          className="w-7 h-7 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-medium text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                          className="w-7 h-7 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Footer */}
            <div className="border-t pt-4 space-y-4">
              {/* Subtotal */}
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Subtotal:</span>
                <span>KES {cartTotal.toLocaleString()}</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button 
                  asChild 
                  className="w-full" 
                  size="lg"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/checkout">
                    Proceed to Checkout
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/cart">
                    View Full Cart
                  </Link>
                </Button>
              </div>

              {/* Continue Shopping */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-full text-sm text-gray-600 hover:text-primary transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}