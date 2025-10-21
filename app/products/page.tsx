// app/products/page.tsx - WITH ADD TO CART BUTTONS
import { ServiceFactory } from "@/lib/api/serviceFactory";
import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";

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
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover our cutting-edge telemetrics, surveillance, and tracking solutions.
          </p>
        </div>

        <div className="space-y-16">
          {/* Recommended Packages */}
          <section
            className="bg-card rounded-xl border p-8 scroll-mt-24"
            id="recommended-packages"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-center">
              Recommended Packages
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
              Tailored packages designed for your specific needs.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Package cards */}
              <div className="bg-background rounded-lg border flex flex-col relative p-6">
                <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                  ON OFFER
                </div>
                <h3 className="text-xl font-bold mb-3">Fleet Safety Package</h3>
                <p className="flex-grow text-sm mb-4 text-gray-600 dark:text-gray-400">
                  Comprehensive safety with ADAS and DMS to prevent accidents.
                </p>
                <Link href="#" className="text-primary font-medium hover:underline">
                  Learn More →
                </Link>
              </div>

              <div className="bg-background rounded-lg border flex flex-col p-6">
                <h3 className="text-xl font-bold mb-3">Asset Tracking Package</h3>
                <p className="flex-grow text-sm mb-4 text-gray-600 dark:text-gray-400">
                  Real-time GPS tracking and geofencing for your assets.
                </p>
                <Link href="#" className="text-primary font-medium hover:underline">
                  Learn More →
                </Link>
              </div>

              <div className="bg-background rounded-lg border flex flex-col p-6">
                <h3 className="text-xl font-bold mb-3">Total Operations Package</h3>
                <p className="flex-grow text-sm mb-4 text-gray-600 dark:text-gray-400">
                  Complete fleet management solution with AI.
                </p>
                <Link href="#" className="text-primary font-medium hover:underline">
                  Learn More →
                </Link>
              </div>
            </div>
          </section>

          {/* MDVRs Section */}
          <section className="scroll-mt-24" id="mdvrs">
            <h2 className="text-3xl font-bold mb-6">MDVRs</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mdvrs.map((mdvr) => (
                <ProductCard key={mdvr.id} product={mdvr} />
              ))}
            </div>
          </section>

          {/* Cameras Section */}
          <section className="scroll-mt-24" id="cameras">
            <h2 className="text-3xl font-bold mb-6">Cameras</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cameras.map((camera) => (
                <ProductCard key={camera.id} product={camera} />
              ))}
            </div>
          </section>

          {/* Accessories Section */}
          <section className="scroll-mt-24" id="accessories">
            <h2 className="text-3xl font-bold mb-6">Accessories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {accessories.length > 0 ? (
                accessories.map((accessory) => (
                  <ProductCard key={accessory.id} product={accessory} />
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500 py-8">
                  No accessories available yet.
                </p>
              )}
            </div>
          </section>

          {/* Cables Section */}
          {cables.length > 0 && (
            <section className="scroll-mt-24" id="cables">
              <h2 className="text-3xl font-bold mb-6">Cables & Wiring</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cables.map((cable) => (
                  <ProductCard key={cable.id} product={cable} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}