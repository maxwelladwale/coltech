import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background-light dark:bg-background-dark border-t border-border-light dark:border-border-dark mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-primary size-6">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path
                    clipRule="evenodd"
                    d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
              <span className="font-bold">COLTECH</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Professional vehicle telematics solutions for modern fleets.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products#mdvrs" className="text-gray-600 dark:text-gray-400 hover:text-primary">MDVRs</Link></li>
              <li><Link href="/products#cameras" className="text-gray-600 dark:text-gray-400 hover:text-primary">Cameras</Link></li>
              <li><Link href="/products#accessories" className="text-gray-600 dark:text-gray-400 hover:text-primary">Accessories</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary">Contact</Link></li>
              <li><Link href="/careers" className="text-gray-600 dark:text-gray-400 hover:text-primary">Careers</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border-light dark:border-border-dark mt-8 pt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2025 COLTECH. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}