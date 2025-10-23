// app/products/[id]/page.tsx - FIXED VERSION FOR APP ROUTER

import { notFound } from "next/navigation";
import { ServiceFactory } from "@/lib/api/serviceFactory";
import AddToCartButton from "@/components/products/AddToCartButton";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { IMDVRProduct } from "@/lib/api/interfaces/types";
import Image from "next/image";

// This generates static params at build time (optional, for static generation)
export async function generateStaticParams() {
  const productService = ServiceFactory.getProductService();
  const products = await productService.getProducts();
  
  return products.map((product) => ({
    id: product.id,
  }));
}

// Page metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const productService = ServiceFactory.getProductService();
  
  try {
    const product = await productService.getProductById(id);
    
    return {
      title: `${product.name} - COLTECH`,
      description: product.description,
    };
  } catch {
    return {
      title: 'Product Not Found - COLTECH',
    };
  }
}

// Server Component (default in App Router)
// export default async function ProductDetailPage({ 
//   params 
// }: { 
//   params: Promise<{ id: string }>
// }) {
//   // Await params in Next.js 15+
//   const { id } = await params;
  
//   const productService = ServiceFactory.getProductService();
  
//   let product;
//   try {
//     product = await productService.getProductById(id);
//   } catch {
//     notFound(); // This triggers the not-found.tsx file
//   }

//   if (!product) {
//     notFound();
//   }

//   return (
//     <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       {/* Back Button */}
//       <Link 
//         href="/products" 
//         className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary mb-8 transition-colors"
//       >
//         <ArrowLeft className="w-4 h-4" />
//         Back to Products
//       </Link>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//         {/* Product Image */}
//         <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 flex items-center justify-center">
//           {product.imageUrl ? (
//             <img
//               src={product.imageUrl}
//               alt={product.name}
//               className="w-full h-96 object-contain rounded-lg"
//             />
//           ) : (
//             <div className="w-full h-96 flex items-center justify-center">
//               <svg 
//                 className="w-32 h-32 text-gray-400" 
//                 fill="none" 
//                 stroke="currentColor" 
//                 viewBox="0 0 24 24"
//               >
//                 <path 
//                   strokeLinecap="round" 
//                   strokeLinejoin="round" 
//                   strokeWidth={2} 
//                   d="M15 10l4.55 2a2 2 0 010 3.1L15 18M4 6h8a2 2 0 012 2v8a2 2 0 01-2 2H4" 
//                 />
//               </svg>
//             </div>
//           )}
//         </div>

//         {/* Product Info */}
//         <div className="flex flex-col">
//           {/* Category Badge */}
//           <span className="inline-block w-fit text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary mb-4">
//             {product.category.toUpperCase()}
//           </span>

//           {/* Product Name */}
//           <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

//           {/* Short Description */}
//           {product.shortDescription && (
//             <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
//               {product.shortDescription}
//             </p>
//           )}

//           {/* Price */}
//           <div className="mb-8">
//             <span className="text-3xl font-bold text-primary">
//               KES {product.price.toLocaleString()}
//             </span>
//           </div>

//           {/* Stock Status */}
//           <div className="mb-8">
//             {product.inStock ? (
//               <div className="flex items-center gap-2 text-green-600">
//                 <div className="w-2 h-2 bg-green-600 rounded-full"></div>
//                 <span className="font-medium">In Stock</span>
//                 {product.stockQuantity && (
//                   <span className="text-sm text-gray-500">
//                     ({product.stockQuantity} available)
//                   </span>
//                 )}
//               </div>
//             ) : (
//               <div className="flex items-center gap-2 text-red-600">
//                 <div className="w-2 h-2 bg-red-600 rounded-full"></div>
//                 <span className="font-medium">Out of Stock</span>
//               </div>
//             )}
//           </div>

//           {/* MDVR Specific Info */}
//           {'channels' in product && (
//             <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
//               <p className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">
//                 📦 Package Includes:
//               </p>
//               <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
//                 #
//                 <li>✓ {product.channels}-Channel MDVR Unit</li>
//                 {'includesFreeLicense' in product && product.includesFreeLicense && (
//                   <li>✓ FREE {product.licenseDurationMonths}-month {product.licenseType.toUpperCase()} License</li>
//                 )}
//               </ul>
//             </div>
//           )}

//           {/* Add to Cart Button (Client Component) */}
//           <AddToCartButton product={product} />

//           {/* Full Description */}
//           <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
//             <h2 className="text-xl font-bold mb-4">Description</h2>
//             <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
//               {product.description}
//             </p>
//           </div>

//           {/* Features (for MDVR/Camera products) */}
//           {'features' in product && product.features && (
//             <div className="mt-8">
//               <h2 className="text-xl font-bold mb-4">Features</h2>
//               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 {product.features.map((feature, idx) => (
//                   <li 
//                     key={idx}
//                     className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
//                   >
//                     <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
//                     {feature}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Specifications */}
//           {product.specifications && (
//             <div className="mt-8">
//               <h2 className="text-xl font-bold mb-4">Specifications</h2>
//               <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
//                 <dl className="space-y-2">
//                   {Object.entries(product.specifications).map(([key, value]) => (
//                     <div key={key} className="flex justify-between text-sm">
//                       <dt className="font-medium text-gray-600 dark:text-gray-400">
//                         {key}:
//                       </dt>
//                       <dd className="text-gray-900 dark:text-gray-100">
//                         {String(value)}
//                       </dd>
//                     </div>
//                   ))}
//                 </dl>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const productService = ServiceFactory.getProductService();
  
  let product;
  try {
    product = await productService.getProductById(id);
  } catch {
    notFound();
  }

  if (!product) {
    notFound();
  }

  // Helper function to check if product is MDVR
  const isMDVR = (p: typeof product): p is IMDVRProduct => {
    return 'channels' in p && 'includesFreeLicense' in p;
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link 
        href="/products" 
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 flex items-center justify-center">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-96 object-contain rounded-lg"
            />
          ) : (
            <div className="w-full h-96 flex items-center justify-center">
              <svg 
                className="w-32 h-32 text-gray-400" 
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
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          {/* Category Badge */}
          <span className="inline-block w-fit text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary mb-4">
            {product.category.toUpperCase()}
          </span>

          {/* Product Name */}
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

          {/* Short Description */}
          {product.shortDescription && (
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {product.shortDescription}
            </p>
          )}

          {/* Price */}
          <div className="mb-8">
            <span className="text-3xl font-bold text-primary">
              KES {product.price.toLocaleString()}
            </span>
          </div>

          {/* Stock Status */}
          <div className="mb-8">
            {product.inStock ? (
              <div className="flex items-center gap-2 text-green-600">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="font-medium">In Stock</span>
                {product.stockQuantity && (
                  <span className="text-sm text-gray-500">
                    ({product.stockQuantity} available)
                  </span>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-600">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span className="font-medium">Out of Stock</span>
              </div>
            )}
          </div>

          {/* MDVR Specific Info */}
          {isMDVR(product) && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
              <p className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">
                📦 Package Includes:
              </p>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <li>✓ {product.channels}-Channel MDVR Unit</li>
                {product.includesFreeLicense && (
                  <li>✓ FREE {product.licenseDurationMonths}-month {product.licenseType.toUpperCase()} License</li>
                )}
              </ul>
            </div>
          )}

          {/* Add to Cart Button (Client Component) */}
          <AddToCartButton product={product} />

          {/* Full Description */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4">Description</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Features (for MDVR/Camera products) */}
          {isMDVR(product) && product.features && product.features.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Features</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, idx) => (
                  <li 
                    key={idx}
                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications */}
          {product.specifications && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Specifications</h2>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <dl className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <dt className="font-medium text-gray-600 dark:text-gray-400">
                        {key}:
                      </dt>
                      <dd className="text-gray-900 dark:text-gray-100">
                        {String(value)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}