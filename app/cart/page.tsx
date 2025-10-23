// app/cart/page.tsx - COMPLETE CART PAGE
'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateCartItem, clearCart, getCartTotal, getCartCount } = useCart();

  const cartTotal = getCartTotal();
  const cartCount = getCartCount();

  const handleUpdateQuantity = (itemId: string, currentQty: number, change: number) => {
    const newQty = currentQty + change;
    if (newQty <= 0) {
      removeFromCart(itemId);
    } else {
      updateCartItem(itemId, newQty);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Looks like you have not added any products to your cart yet.
          </p>
          <Button asChild size="lg">
            <Link href="/products">
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold">
              Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
            </h1>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
              Clear Cart
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div 
                key={item.id}
                className="bg-card border rounded-lg p-6 flex gap-6"
              >
                {/* Product Image */}
                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded flex-shrink-0 flex items-center justify-center">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={240}
                      height={240}
                      className="rounded"
                    />
                  ) : (
                    <ShoppingCart className="w-10 h-10 text-gray-400" />
                  )}
                </div>
                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-4 mb-2">
                    <div>
                      {item.category && (
                        <span className="inline-block text-xs font-semibold px-2 py-1 rounded bg-primary/10 text-primary mb-2">
                          {item.category.toUpperCase()}
                        </span>
                      )}
                      <h3 className="text-lg font-semibold mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        KES {item.price.toLocaleString()} each
                      </p>
                    </div>
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors h-fit"
                      title="Remove from cart"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Quantity & Subtotal */}
                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">Quantity:</span>
                      <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                          className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-l-lg"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 border-x border-gray-300 dark:border-gray-700 font-medium min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                          className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-r-lg"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Item Subtotal */}
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Subtotal
                      </p>
                      <p className="text-xl font-bold text-primary">
                        KES {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-medium">KES {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Tax</span>
                  <span className="font-medium">Included</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">KES {cartTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Button asChild className="w-full mb-3" size="lg">
                <Link href="/checkout">
                  Proceed to Checkout
                </Link>
              </Button>

              <Button asChild variant="outline" className="w-full">
                <Link href="/products">
                  Continue Shopping
                </Link>
              </Button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Professional Installation</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>12-Month Free License</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}