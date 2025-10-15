// 'use client';   

import { ServiceFactory } from "@/lib/api/serviceFactory";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, ArrowLeft, Check } from "lucide-react";
import type { Metadata } from "next";
import { GetServerSideProps } from "next";
// import { useRouter } from "next/navigation";

export async function generateMetadata({ 
  params 
}: { 
  params: { id: string } 
}): Promise<Metadata> {
  const productService = ServiceFactory.getProductService();
  
  try {
    const product = await productService.getProductById(params.id);
    
    return {
      title: `${product.name} - COLTECH`,
      description: product.description,
    };
  } catch {
    return {
      title: "Product Not Found - COLTECH",
    };
  }
}

// ============================================================================
// PRODUCT DETAILS PAGE COMPONENT
// ============================================================================

export default async function ProductDetailsPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const productService = ServiceFactory.getProductService();

  // const router = useRouter();

  // if (router.isFallback) {
  //   return <div>Loading...</div>;
  // }
  
  // Fetch product by ID
  let product;
  try {
    product = await productService.getProductById(params.id);
  } catch {
    // If product not found, show 404
    notFound();
  }

  // Check if it's an MDVR (has additional fields)
  const isMDVR = product.category === 'mdvr';
  let mdvrDetails = null;
  
  if (isMDVR) {
    const mdvrs = await productService.getMDVRProducts();
    mdvrDetails = mdvrs.find(m => m.id === params.id);
  }

  // Check stock availability
  const stockInfo = await productService.checkStock(params.id);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Link 
        href="/products" 
        className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Column - Image */}
        <div>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-xl aspect-square flex items-center justify-center mb-4">
            {product.imageUrl ? (
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
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
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
            )}
          </div>

          {/* Video if available */}
          {product.videoUrl && (
            <div className="mt-4">
              <iframe
                src={product.videoUrl}
                className="w-full aspect-video rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>

        {/* Right Column - Details */}
        <div>
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full capitalize">
              {product.category}
            </span>
          </div>

          {/* Product Name */}
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

          {/* Price */}
          <div className="mb-6">
            <p className="text-4xl font-bold text-primary">
              KES {product.price.toLocaleString()}
            </p>
          </div>    

          {/* Stock Status */}
          <div className="mb-6">
            {stockInfo.available ? (
              <div className="flex items-center gap-2 text-green-600">
                <Check className="w-5 h-5" />
                <span className="font-semibold">In Stock</span>
                <span className="text-sm text-gray-600">
                  ({stockInfo.quantity} available)
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-600">
                <span className="font-semibold">Out of Stock</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* MDVR-Specific Details */}
          {mdvrDetails && (
            <div className="mb-8 space-y-6">
              {/* License Info */}
              {mdvrDetails.includesFreeLicense && (
                <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-green-900 dark:text-green-100 mb-1">
                        Free License Included
                      </h3>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        This MDVR includes a {mdvrDetails.licenseDurationMonths}-month{' '}
                        {mdvrDetails.licenseType === 'ai' ? 'AI' : 'Standard'} license 
                        (worth KES {mdvrDetails.licenseType === 'ai' ? '12,000' : '8,000'})
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Specifications */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Specifications</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Channels</p>
                    <p className="text-2xl font-bold">{mdvrDetails.channels}</p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">License Type</p>
                    <p className="text-2xl font-bold capitalize">{mdvrDetails.licenseType}</p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 col-span-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Storage Options</p>
                    <div className="flex gap-2">
                      {mdvrDetails.storageOptions.map((option, idx) => (
                        <span 
                          key={idx}
                          className="bg-primary/10 text-primary px-3 py-1 rounded text-sm font-semibold"
                        >
                          {option === 'hdd' ? 'HDD' : 'SD Card'}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Features</h2>
                <ul className="space-y-2">
                  {mdvrDetails.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Renewal Pricing */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Annual Renewal</h3>
                <p className="text-2xl font-bold text-primary">
                  KES {mdvrDetails.licenseType === 'ai' ? '12,000' : '8,000'} /year
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  After the initial {mdvrDetails.licenseDurationMonths}-month period
                </p>
              </div>
            </div>
          )}

          {/* Technical Specifications (if available) */}
          {product.specifications && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Technical Specifications</h2>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                    <span className="text-gray-600 dark:text-gray-400 capitalize">
                      {key.replace(/_/g, ' ')}
                    </span>
                    <span className="font-medium">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <div className="space-y-4">
            <button 
              disabled={!stockInfo.available}
              className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              {stockInfo.available ? 'Add to Cart' : 'Out of Stock'}
            </button>

            <button className="w-full border-2 border-primary text-primary font-semibold py-4 rounded-lg hover:bg-primary/10 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>

      {/* Related Products (Optional) */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8">Related Products</h2>
        <p className="text-gray-500">Related products will appear here...</p>
      </div>
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const productService = ServiceFactory.getProductService();
//   const { id } = params;

//   try {
//     const product = await productService.getProductById(id);
//     return {
//       props: {
//         product,
//       },
//     };
//   } catch {
//     return {
//       notFound: true,
//     };
//   }
// }



// ============================================================================
// ALTERNATIVE: SIMPLER VERSION (If you want less detail)
// ============================================================================

// export async function SimpleProductDetailsPage({ params }: { params: { id: string } }) {
//   const productService = ServiceFactory.getProductService();
  
//   try {
//     const product = await productService.getProductById(params.id);
    
//     return (
//       <div className="container mx-auto px-4 py-12 max-w-4xl">
//         <Link href="/products" className="text-primary hover:underline mb-8 inline-block">
//           ← Back to Products
//         </Link>

//         <div className="bg-white dark:bg-gray-800 rounded-xl border p-8">
//           <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          
//           <p className="text-3xl font-bold text-primary mb-6">
//             KES {product.price.toLocaleString()}
//           </p>

//           <p className="text-gray-600 dark:text-gray-400 mb-8">
//             {product.description}
//           </p>

//           {product.inStock ? (
//             <button className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-primary/90">
//               Add to Cart
//             </button>
//           ) : (
//             <button disabled className="w-full bg-gray-300 text-gray-500 font-bold py-4 rounded-lg cursor-not-allowed">
//               Out of Stock
//             </button>
//           )}
//         </div>
//       </div>
//     );
//   } catch {
//     notFound();
//   }
// }