// app/products/page.tsx - CLEAN VERSION
import { ServiceFactory } from "@/lib/api/serviceFactory";
import Link from "next/link";
// import { useRouter } from "next/router";

// Page metadata
export const metadata = {
  title: "Products - COLTECH",
  description: "Browse our MDVR and vehicle monitoring products",
};

export default async function ProductsPage() {
  const productService = ServiceFactory.getProductService();

  // Fetch products
  const allProducts = await productService.getProducts();
  const mdvrs = await productService.getMDVRProducts();
  const cameras = await productService.getCameras();

  // Categorize
  // const cameras = allProducts.filter(p => p.category === "camera");
  const cables = allProducts.filter(p => p.category === "cable");
  const accessories = allProducts.filter(p => p.category === "accessory");

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Products Overview
          </h1>
          <p className="text-lg text-foreground-light/80 dark:text-foreground-dark/80">
            Discover our cutting-edge telemetrics, surveillance, and tracking solutions.
          </p>
        </div>

        <div className="space-y-16">
          {/* Recommended Packages */}
          <section
            className="bg-card-light dark:bg-card-dark p-8 rounded-xl border border-border-light dark:border-border-dark scroll-mt-24"
            id="recommended-packages"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-center">
              Recommended Packages
            </h2>
            <p className="text-center text-foreground-light/80 dark:text-foreground-dark/80 mb-8">
              Tailored packages designed for your specific needs.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Package cards */}
              <div className="bg-background-light dark:bg-background-dark p-6 rounded-lg border flex flex-col relative">
                <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                  ON OFFER
                </div>
                <h3 className="text-xl font-bold mb-3">Fleet Safety Package</h3>
                <p className="flex-grow text-sm mb-4">
                  Comprehensive safety with ADAS and DMS to prevent accidents.
                </p>
                <Link href="#" className="text-primary font-medium hover:underline">
                  Learn More
                </Link>
              </div>

              <div className="bg-background-light dark:bg-background-dark p-6 rounded-lg border flex flex-col">
                <h3 className="text-xl font-bold mb-3">Asset Tracking Package</h3>
                <p className="flex-grow text-sm mb-4">
                  Real-time GPS tracking and geofencing for your assets.
                </p>
                <Link href="#" className="text-primary font-medium hover:underline">
                  Learn More
                </Link>
              </div>

              <div className="bg-background-light dark:bg-background-dark p-6 rounded-lg border flex flex-col">
                <h3 className="text-xl font-bold mb-3">Total Operations Package</h3>
                <p className="flex-grow text-sm mb-4">
                  Complete fleet management solution with AI.
                </p>
                <Link href="#" className="text-primary font-medium hover:underline">
                  Learn More
                </Link>
              </div>
            </div>
          </section>

          {/* MDVRs Section */}
          <section className="scroll-mt-24" id="mdvrs">
            <h2 className="text-3xl font-bold mb-6">MDVRs</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mdvrs.map((mdvr) => (
                <div
                  key={mdvr.id}
                  className="bg-card-light dark:bg-card-dark rounded-xl border overflow-hidden flex flex-col"
                >
                  {/* Image placeholder */}
                  <div className="bg-gray-200 dark:bg-gray-700 h-48 flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.55 2a2 2 0 010 3.1L15 18M4 6h8a2 2 0 012 2v8a2 2 0 01-2 2H4" />
                    </svg>
                  </div>

                  {/* Details */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2">{mdvr.name}</h3>

                    <p className="text-2xl font-bold text-primary mb-2">
                      KES {mdvr.price.toLocaleString()}
                    </p>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                      {mdvr.description}
                    </p>

                    {/* Specs */}
                    <div className="space-y-2 mb-4">
                      <p className="text-sm">
                        <span className="font-semibold">Channels:</span> {mdvr.channels}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">License:</span> {mdvr.licenseType === 'ai' ? 'AI' : 'Standard'}
                      </p>

                      {mdvr.includesFreeLicense && (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-2">
                          <p className="text-xs text-green-700 dark:text-green-300 font-semibold">
                            ✓ Includes {mdvr.licenseDurationMonths}-month free license
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {mdvr.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        href={`/products/${mdvr.id}`}  // ← This goes to /products/1, /products/2, etc.
                        className="bg-primary text-white py-2 px-4 rounded"
                      >
                        View Details
                      </Link>
                      <button className="flex-1 border border-gray-300 dark:border-gray-700 py-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Cameras Section */}
          <section className="scroll-mt-24" id="mdvrs">
            <h2 className="text-3xl font-bold mb-6">Cameras</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cameras.map((camera) => (
                <div
                  key={camera.id}
                  className="bg-card-light dark:bg-card-dark rounded-xl border overflow-hidden flex flex-col"
                >
                  {/* Image placeholder */}
                  <div className="bg-gray-200 dark:bg-gray-700 h-48 flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.55 2a2 2 0 010 3.1L15 18M4 6h8a2 2 0 012 2v8a2 2 0 01-2 2H4" />
                    </svg>
                  </div>

                  {/* Details */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2">{camera.name}</h3>

                    <p className="text-2xl font-bold text-primary mb-2">
                      KES {camera.price.toLocaleString()}
                    </p>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                      {camera.description}
                    </p>

                    {/* Specs */}
                    <div className="space-y-2 mb-4">
                      <p className="text-sm">
                        <span className="font-semibold">Channels:</span> {camera.channels}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {camera.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        href={`/products/${camera.id}`}  // ← This goes to /products/1, /products/2, etc.
                        className="bg-primary text-white py-2 px-4 rounded"
                      >
                        View Details
                      </Link>
                      <button className="flex-1 border border-gray-300 dark:border-gray-700 py-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Accessories Section */}
          <section className="scroll-mt-24" id="accessories">
            <h2 className="text-3xl font-bold mb-6">Accessories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {accessories.length > 0 ? (
                accessories.map((accessory) => (
                  <div key={accessory.id} className="bg-card-light dark:bg-card-dark rounded-xl border p-6">
                    <h3 className="text-xl font-bold mb-2">{accessory.name}</h3>
                    <p className="text-2xl font-bold text-primary mb-2">
                      KES {accessory.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {accessory.description}
                    </p>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500 py-8">
                  No accessories available yet.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}