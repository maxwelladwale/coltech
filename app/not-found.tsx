// ============================================================================
// 404 NOT FOUND PAGE
// File: app/products/[id]/not-found.tsx
// ============================================================================

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Product Not Found</h1>
      <p className="text-gray-600 mb-6">
        The product you're looking for doesn't exist or has been removed.
      </p>
      <a href="/products" className="text-primary hover:underline">
        ← Back to Products
      </a>
    </div>
  );
}