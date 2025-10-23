// components/products/ProductCard.tsx
'use client';

import { IProduct, IMDVRProduct } from '@/lib/api/interfaces/types';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Eye } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

interface ProductCardProps {
  product: IProduct;
}

// Type guard
const isMDVR = (product: IProduct): product is IMDVRProduct => {
  return 'channels' in product && 'includesFreeLicense' in product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    addToCart({
      ...product,
      quantity: 1
    });

    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className="bg-card rounded-xl border overflow-hidden flex flex-col group hover:shadow-lg transition-shadow">
      {/* Image */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="bg-gray-200 dark:bg-gray-700 h-48 flex items-center justify-center relative overflow-hidden">
          {product.imageUrl ? (
            <Image
              width={300}
              height={300}
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <svg 
              className="w-16 h-16 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 10l4.55 2a2 2 0 010 3.1L15 18M4 6h8a2 2 0 012 2v8a2 2 0 01-2 2H4" 
              />
            </svg>
          )}
          
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Eye className="w-8 h-8 text-white" />
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Category Badge */}
        <span className="inline-block w-fit text-xs font-semibold px-2 py-1 rounded bg-primary/10 text-primary mb-2">
          {product.category.toUpperCase()}
        </span>

        {/* Product Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <p className="text-2xl font-bold text-primary mb-2">
          KES {product.price.toLocaleString()}
        </p>

        {/* Short Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow line-clamp-2">
          {product.shortDescription || product.description}
        </p>

        {/* MDVR Specific Info */}
        {isMDVR(product) && product.includesFreeLicense && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-2 mb-4">
            <p className="text-xs text-green-700 dark:text-green-300 font-semibold">
              ✓ Includes {product.licenseDurationMonths}-month free {product.licenseType.toUpperCase()} license
            </p>
          </div>
        )}

        {/* Features (if available) */}
        {isMDVR(product) && product.features && product.features.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {product.features.slice(0, 3).map((feature, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                >
                  {feature}
                </span>
              ))}
              {product.features.length > 3 && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{product.features.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Stock Status */}
        <div className="mb-4">
          {product.inStock ? (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span>In Stock</span>
              {product.stockQuantity && product.stockQuantity < 10 && (
                <span className="text-xs text-gray-500">
                  (Only {product.stockQuantity} left)
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-red-600 text-sm">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <span>Out of Stock</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <Button
            asChild
            variant="outline"
            className="flex-1"
            size="sm"
          >
            <Link href={`/products/${product.id}`}>
              <Eye className="w-4 h-4" />
              View Details
            </Link>
          </Button>
          
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock || isAdding}
            className="flex-1"
            size="sm"
          >
            <ShoppingCart className="w-4 h-4" />
            {isAdding ? 'Added!' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
}