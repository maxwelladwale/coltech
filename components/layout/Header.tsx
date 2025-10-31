// components/layout/Header.tsx - UPDATED WITH CART AND AUTH
"use client";

import Link from "next/link";
import { useState } from "react";
import CartDrawer from "@/components/cart/CartDrawer";
import { useAuth } from "@/contexts/AuthContext";
import { User, LogOut } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-border-light dark:border-border-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition">
            <div className="text-primary size-7">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path
                  clipRule="evenodd"
                  d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold">COLTECH</h2>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
                Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Dropdown */}
              <div className="absolute left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white dark:bg-card-dark border border-border-light dark:border-border-dark rounded-lg shadow-lg py-2">
                <Link href="/products#mdvrs" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-background-dark">
                  MDVRs
                </Link>
                <Link href="/products#cameras" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-background-dark">
                  Cameras
                </Link>
                <Link href="/products#accessories" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-background-dark">
                  Accessories
                </Link>
              </div>
            </div>
            <Link href="/about" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-background-dark">
              About Us
            </Link>
            <Link href="/solutions" className="text-sm font-medium hover:text-primary transition-colors">
              Solutions
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              Company
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Cart Drawer */}
            <CartDrawer />

            {/* Auth Actions */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-2">
                <div className="relative group">
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">{user?.fullName?.split(' ')[0]}</span>
                  </button>
                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white dark:bg-card-dark border border-border-light dark:border-border-dark rounded-lg shadow-lg py-2">
                    <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-background-dark">
                      My Profile
                    </Link>
                    <Link href="/orders" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-background-dark">
                      My Orders
                    </Link>
                    <Link href="/licenses" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-background-dark">
                      My Licenses
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-background-dark flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden sm:flex text-sm font-medium hover:text-primary transition-colors items-center px-3 py-2"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="hidden sm:flex bg-primary text-white text-sm font-bold h-10 px-4 rounded-lg hover:bg-primary/90 transition-colors items-center"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Contact Button */}
            <Link
              href="/contact"
              className="hidden lg:flex bg-primary text-white text-sm font-bold h-10 px-4 rounded-lg hover:bg-primary/90 transition-colors items-center"
            >
              Contact Us
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border-light dark:border-border-dark">
            <div className="flex flex-col gap-4">
              <Link
                href="/products"
                className="text-sm font-medium hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/solutions"
                className="text-sm font-medium hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Solutions
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Company
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>

              {/* Mobile Auth Actions */}
              <div className="border-t border-border-light dark:border-border-dark pt-4 mt-2">
                {isAuthenticated ? (
                  <>
                    <div className="mb-3 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Signed in as</p>
                      <p className="text-sm font-medium">{user?.fullName}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="block text-sm font-medium hover:text-primary py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/orders"
                      className="block text-sm font-medium hover:text-primary py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    <Link
                      href="/licenses"
                      className="block text-sm font-medium hover:text-primary py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Licenses
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-sm font-medium text-red-600 py-2 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block text-sm font-medium hover:text-primary py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="block text-sm font-medium text-white bg-primary px-4 py-2 rounded-lg hover:bg-primary/90 mt-2 text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}