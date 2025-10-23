// app/page.tsx

import Link from 'next/link';
import type { Metadata } from 'next';
import VerificationFlow from '@/components/verification/VerificationFlow';

export const metadata: Metadata = {
  title: 'COLTECH - Advanced Security Solutions',
  description: 'COLTECH provides cutting-edge security systems, including Telematrix solutions, to protect your assets and ensure peace of mind.',
};

export default function HomePage() {
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBGvPPC2ysmhj-FTPkn9qD19AWI8whUnnxa2nb4SHmGc4ysfh3oO8xnjCanAJ0Ht7TEHk5Y-JiXIfzheztcLNgqIgeYjO7fSQoqkv3muvFGrRmBJIJr2mmKDujl1NIP50S4nKaBAPtZyV_Rk-GVTfjOLVOEA7i0OlKnkd8c-dVAwZ-BB7xujVQxHafc256_fNZRtqugsHbNZ3uXdIQYmu3QdK8yKGSFAJ5Hv_rMAJB5LVvrrOplLaZVVuGe2TWr1TzWT93E_t6b_-Y")'
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-48 text-center text-white">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Advanced Security Solutions for Your Business
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-200">
            COLTECH provides cutting-edge security systems, including Telematrix solutions, to protect 
            your assets and ensure peace of mind.
          </p>
          <div className="mt-10">
            <Link 
              href="/products"
              className="inline-block min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold shadow-lg hover:bg-primary/90 transition-colors"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 sm:py-24 bg-background-light dark:bg-background-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-center text-slate-900 dark:text-white">
            Featured Products
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Product 1 - Telematrix */}
            <Link href="/solutions" className="flex flex-col gap-4 rounded-lg overflow-hidden group hover:scale-105 transition-transform">
              <div 
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                style={{
                  backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCJq7IYXURGf83_q79kTJmyT0nJ2nWzw84egxQOJu0_1D7n7oVO97tkqNY86h-HjwV_SUL1mgcDQYLYG7TJ3EzZ27eYeH2oqXD1qQPUrG14ZK6dvowUxMJl7kRabYBRl3hxUjfXAuNa3fesEFp2KFd5k-Vn_XgevvOKpjq03A9BVGonCsrk6_-tiE414Du8f6dzi9hp_23ME0Lf4luqLt1sBxYoZWUyyOHfCxY1wlBOqENCisQ1uWzFU0KNofUhJ2DXB0vunRKe4zs")'
                }}
              />
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Telematrix Solutions
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Advanced communication and security integration.
                </p>
              </div>
            </Link>

            {/* Product 2 - Access Control */}
            <Link href="/products" className="flex flex-col gap-4 rounded-lg overflow-hidden group hover:scale-105 transition-transform">
              <div 
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                style={{
                  backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB6bZdmPKNSFPBLtAt-BM8GrI7ZZcacAYF29VDnpPclmScEBrE5tpixREzPLuZUC2Db9MwPKliKMVbj3MeTY1px0pIR3i3-j6vK4Pw-kLDh7JVLn6g3AMv_4Ujfpdys1lC5Y0y66afpvCFSww-LoitMwJx_ZVyEndZaCfUfeggklmHhbWT2EH2tzDXQyjp7l0qVpcp6JrNp53rxwyDQpCykhVDO3FPNXiHNOil7iNMXcfWuX14M7rhFQ9feXdR1c8Z8krBxZp_50HA")'
                }}
              />
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Access Control Systems
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Manage and monitor access to your premises.
                </p>
              </div>
            </Link>

            {/* Product 3 - Intrusion Detection */}
            <Link href="/products" className="flex flex-col gap-4 rounded-lg overflow-hidden group hover:scale-105 transition-transform">
              <div 
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                style={{
                  backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAJxcrsWqDn7UO3gvWrHyZBsfLIbY4G-Dx5V02X_-UNH-6kqMtibwkCf93Ltxb7uEf0B1WnKhMr41AzHQ4iiPnLfiDjtqahKwxjclY41CFK8TLzF1CqW-LCIvwOqpUmuzH9ixEyvnlkCwEvD3HLx_owugLKjWg5FS3QSY6WHG7LqdZ-1nsNvgTdzlw9RlCp4wqJb3nbz_hU9rgPNt5-BDnKblXn-8iwyDUwU1sARpEk_AhmtAuVwWytjpIXjEdw5eIGXj8sRSzu36U")'
                }}
              />
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Intrusion Detection
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Protect your property with state-of-the-art alarms.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Verification Flow */}
      <VerificationFlow />

      {/* Services Section */}
      <section className="py-16 sm:py-24 bg-background-light dark:bg-background-dark/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-center text-slate-900 dark:text-white">
            Our Services
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-3">
            {/* Installation */}
            <div className="flex flex-col gap-4 rounded-lg border border-slate-200 dark:border-slate-800 p-6 bg-background-light dark:bg-background-dark text-center items-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary">
                <svg fill="currentColor" height="28" viewBox="0 0 256 256" width="28" xmlns="http://www.w3.org/2000/svg">
                  <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Installation
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Professional installation of all security systems.
              </p>
            </div>

            {/* Maintenance */}
            <div className="flex flex-col gap-4 rounded-lg border border-slate-200 dark:border-slate-800 p-6 bg-background-light dark:bg-background-dark text-center items-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary">
                <svg fill="currentColor" height="28" viewBox="0 0 256 256" width="28" xmlns="http://www.w3.org/2000/svg">
                  <path d="M208,40H48A16,16,0,0,0,32,56v58.77c0,89.61,75.82,119.34,91,124.39a15.53,15.53,0,0,0,10,0c15.2-5.05,91-34.78,91-124.39V56A16,16,0,0,0,208,40Zm0,74.79c0,78.42-66.35,104.62-80,109.18-13.53-4.51-80-30.69-80-109.18V56l160,0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Maintenance
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Regular maintenance to ensure optimal performance.
              </p>
            </div>

            {/* Support */}
            <div className="flex flex-col gap-4 rounded-lg border border-slate-200 dark:border-slate-800 p-6 bg-background-light dark:bg-background-dark text-center items-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary">
                <svg fill="currentColor" height="28" viewBox="0 0 256 256" width="28" xmlns="http://www.w3.org/2000/svg">
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm39.1,131.79a47.84,47.84,0,0,0,0-55.58l28.5-28.49a87.83,87.83,0,0,1,0,112.56ZM96,128a32,32,0,1,1,32,32A32,32,0,0,1,96,128Zm88.28-67.6L155.79,88.9a47.84,47.84,0,0,0-55.58,0L71.72,60.4a87.83,87.83,0,0,1,112.56,0ZM60.4,71.72l28.5,28.49a47.84,47.84,0,0,0,0,55.58L60.4,184.28a87.83,87.83,0,0,1,0-112.56ZM71.72,195.6l28.49-28.5a47.84,47.84,0,0,0,55.58,0l28.49,28.5a87.83,87.83,0,0,1-112.56,0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Support
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                24/7 support for any issues or concerns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-background-light dark:bg-background-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 dark:text-white">
            Ready to Secure Your Business?
          </h2>
          <div className="mt-8">
            <Link 
              href="/contact"
              className="inline-block min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold shadow-lg hover:bg-primary/90 transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}