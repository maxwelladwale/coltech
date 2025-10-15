import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Shield, Wrench, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            COLTECH Vehicle Telematics
          </h1>
          <p className="text-xl mb-8 text-gray-300">
            Professional MDVR Systems & Fleet Monitoring Solutions
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200">
              <Link href="/products">Browse Products</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white">
              <Link href="/verify">Verify Certificate</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <ShoppingCart className="w-12 h-12 mb-4" />
                <CardTitle>Easy Shopping</CardTitle>
              </CardHeader>
              <CardContent>
                Browse our catalog, customize packages, and checkout securely online.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Wrench className="w-12 h-12 mb-4" />
                <CardTitle>Professional Installation</CardTitle>
              </CardHeader>
              <CardContent>
                Schedule installation with our certified partner garages across Kenya.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="w-12 h-12 mb-4" />
                <CardTitle>License Management</CardTitle>
              </CardHeader>
              <CardContent>
                Track licenses, receive expiry reminders, and renew online with ease.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Explore our MDVR systems with free 1-year licenses
          </p>
          <Button asChild size="lg">
            <Link href="/products/mdvr">View MDVR Systems</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}