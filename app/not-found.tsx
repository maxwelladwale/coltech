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
        The product you are looking for does not exist or has been removed.
      </p>
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>
    </div>
  );
}