// app/order-confirmation/[orderId]/page.tsx
import { ServiceFactory } from '@/lib/api/serviceFactory';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Home, Package, MapPin, Wrench } from 'lucide-react';
import { IOrder } from '@/lib/api/interfaces/types';
export default async function OrderConfirmationPage({
  params
}: {
  params: Promise<{ orderId: string }>
}) {
  // Await params in Next.js 15+
  const { orderId } = await params;
  
  const orderService = ServiceFactory.getOrderService();
  
  let order: IOrder;
  try {
    order = await orderService.getOrderById(orderId);
    console.log("ORDER PLACED IN CONFIRMATION PAGE", orderId);
    console.log("ORDER DETAILS", order);
    console.log("ORDER ITEMS", order.items);
    console.log("ORDER SHIPPING ADDRESS", order);
    console.log("ORDER INSTALLATION DETAILS", order.installationDetails);
    console.log("ORDER PAYMENT METHOD", order.paymentMethod);
  } catch {
    notFound();
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Order Confirmed!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Thank you for your order
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-6 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Order Number</p>
                <p className="text-2xl font-bold">{order.orderNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Order Date</p>
                <p className="font-medium">{formatDate(order.createdAt)}</p>
              </div>
            </div>

            {/* What's Next Section */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
                What happens next?
              </h3>
              <ol className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <li className="flex gap-2">
                  <span className="font-bold">1.</span>
                  <span>You will receive an order confirmation email at <strong>{order.shippingAddress.email}</strong></span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">2.</span>
                  <span>Our team will contact you within 24 hours to confirm details</span>
                </li>
                {order.installationDetails?.method === 'technician' && (
                  <li className="flex gap-2">
                    <span className="font-bold">3.</span>
                    <span>We will schedule your installation at a nearby partner garage</span>
                  </li>
                )}
                <li className="flex gap-2">
                  <span className="font-bold">{order.installationDetails?.method === 'technician' ? '4' : '3'}.</span>
                  <span>Your license will be activated after installation</span>
                </li>
              </ol>
            </div>

            {/* Order Items */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order Items
              </h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b last:border-b-0">
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Qty: {item.quantity} × KES {item.unitPrice.toLocaleString()}
                      </p>
                    </div>
                    <p className="font-semibold">
                      KES {item.totalPrice.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="mt-4 pt-4 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span>KES {order.subtotal.toLocaleString()}</span>
                </div>
                {order.shipping && order.shipping > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span>KES {order.shipping.toLocaleString()}</span>
                  </div>
                )}
                {order.tax && order.tax > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Tax</span>
                    <span>KES {order.tax.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total</span>
                  <span className="text-primary">KES {order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Shipping Address
              </h3>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <p className="font-medium">{order.shippingAddress.fullName}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {order.shippingAddress.address}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {order.shippingAddress.city}, {order.shippingAddress.county}
                  {order.shippingAddress.postalCode && ` ${order.shippingAddress.postalCode}`}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Phone: {order.shippingAddress.phone}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Email: {order.shippingAddress.email}
                </p>
              </div>
            </div>

            {/* Installation Details */}
            {order.installationDetails && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Wrench className="w-5 h-5" />
                  Installation Details
                </h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  {order.installationDetails.method === 'technician' ? (
                    <>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="font-medium">Professional Installation</span>
                      </div>
                      {order.installationDetails.vehicleRegistration && (
                        <div className="space-y-1 text-sm">
                          <p className="text-gray-600 dark:text-gray-400">
                            Vehicle: <span className="font-medium text-foreground">
                              {order.installationDetails.vehicleRegistration}
                            </span>
                          </p>
                          {order.installationDetails.vehicleMake && (
                            <p className="text-gray-600 dark:text-gray-400">
                              Make/Model: <span className="font-medium text-foreground">
                                {order.installationDetails.vehicleMake} {order.installationDetails.vehicleModel}
                              </span>
                            </p>
                          )}
                        </div>
                      )}
                      <div className="mt-3 text-sm text-blue-600 dark:text-blue-400">
                        📞 Our team will contact you to schedule your installation appointment
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                        <span className="font-medium">Self Installation</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Installation manual and support contact will be included in your package
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Payment Information */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Payment Information</h3>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium capitalize">
                      {order.paymentMethod?.replace('_', ' ') || 'Payment Method'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Status: <span className={`font-medium ${
                        order.paymentStatus === 'paid' ? 'text-green-600' :
                        order.paymentStatus === 'failed' ? 'text-red-600' :
                        'text-yellow-600'
                      }`}>
                        {order.paymentStatus === 'paid' ? 'Paid' :
                         order.paymentStatus === 'failed' ? 'Failed' :
                         'Pending'}
                      </span>
                    </p>
                  </div>
                  {order.paymentStatus === 'pending' && (
                    <Button size="sm" variant="outline">
                      Complete Payment
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/">
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/products">
                <Package className="w-4 h-4" />
                Continue Shopping
              </Link>
            </Button>
            {order.invoiceUrl && (
              <Button asChild size="lg">
                <a href={order.invoiceUrl} download>
                  <Download className="w-4 h-4" />
                  Download Invoice
                </a>
              </Button>
            )}
          </div>

          {/* Support Section */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Questions about your order?
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <Link href="/contact" className="text-primary hover:underline">
                Contact Support
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="/track-order" className="text-primary hover:underline">
                Track Your Order
              </Link>
              <span className="text-gray-300">|</span>
              <a href="tel:+254712345678" className="text-primary hover:underline">
                Call: +254 712 345 678
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}