// app/checkout/page.tsx - COMPLETE CHECKOUT FLOW
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ServiceFactory } from '@/lib/api/serviceFactory';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart, 
  User, 
  MapPin, 
  Wrench, 
  CreditCard, 
  CheckCircle,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

const KENYAN_COUNTIES = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 
  'Malindi', 'Kitale', 'Garissa', 'Kakamega', 'Machakos', 'Meru',
  'Nyeri', 'Kiambu', 'Kajiado', 'Kilifi', 'Kwale', 'Taita-Taveta'
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart, getCartTotal } = useCart();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form State
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    county: '',
    postalCode: ''
  });

  const [installationMethod, setInstallationMethod] = useState<'self' | 'technician'>('technician');
  const [installationDetails, setInstallationDetails] = useState({
    garageId: '',
    appointmentDate: '',
    appointmentTime: '',
    vehicleRegistration: '',
    vehicleMake: '',
    vehicleModel: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card' | 'bank'>('mpesa');
  const [paymentDetails, setPaymentDetails] = useState({
    mpesaPhone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });

  const cartTotal = getCartTotal();
  const cartCount = cart.length;

  // Redirect if cart is empty
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Add some products before checking out</p>
        <Button asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handleInstallationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const orderService = ServiceFactory.getOrderService();
      
      const orderData = {
        cartId: 'cart-temp-id',
        shippingAddress: shippingInfo,
        installationDetails: installationMethod === 'technician' ? {
          method: installationMethod,
          ...installationDetails
        } : {
          method: installationMethod
        },
        paymentMethod
      };

      const order = await orderService.createOrder(orderData);
      
      // Clear cart after successful order
      clearCart();
      
      // Redirect to order confirmation
      router.push(`/order-confirmation/${order.id}`);
    } catch (error) {
      console.error('Order creation failed:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Checkout</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Complete your order in {installationMethod === 'technician' ? '3' : '2'} easy steps
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4">
              {/* Step 1 */}
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {currentStep > 1 ? <CheckCircle className="w-6 h-6" /> : '1'}
                </div>
                <span className="ml-2 text-sm font-medium hidden sm:inline">Shipping</span>
              </div>
              
              <div className="w-12 sm:w-24 h-1 bg-gray-300">
                <div className={`h-full transition-all ${
                  currentStep >= 2 ? 'bg-primary' : 'bg-gray-300'
                }`} style={{ width: currentStep >= 2 ? '100%' : '0%' }} />
              </div>

              {/* Step 2 */}
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {currentStep > 2 ? <CheckCircle className="w-6 h-6" /> : '2'}
                </div>
                <span className="ml-2 text-sm font-medium hidden sm:inline">Installation</span>
              </div>

              <div className="w-12 sm:w-24 h-1 bg-gray-300">
                <div className={`h-full transition-all ${
                  currentStep >= 3 ? 'bg-primary' : 'bg-gray-300'
                }`} style={{ width: currentStep >= 3 ? '100%' : '0%' }} />
              </div>

              {/* Step 3 */}
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= 3 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  3
                </div>
                <span className="ml-2 text-sm font-medium hidden sm:inline">Payment</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* STEP 1: Shipping Information */}
              {currentStep === 1 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold">Shipping Information</h2>
                  </div>

                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          required
                          value={shippingInfo.fullName}
                          onChange={(e) => setShippingInfo({...shippingInfo, fullName: e.target.value})}
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                          placeholder="+254 712 345 678"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        required
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                        placeholder="123 Main Street"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          required
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                          placeholder="Nairobi"
                        />
                      </div>

                      <div>
                        <Label htmlFor="county">County *</Label>
                        <Select
                          value={shippingInfo.county}
                          onValueChange={(value) => setShippingInfo({...shippingInfo, county: value})}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select county" />
                          </SelectTrigger>
                          <SelectContent>
                            {KENYAN_COUNTIES.map(county => (
                              <SelectItem key={county} value={county}>
                                {county}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          value={shippingInfo.postalCode}
                          onChange={(e) => setShippingInfo({...shippingInfo, postalCode: e.target.value})}
                          placeholder="00100"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button type="submit" size="lg">
                        Continue to Installation
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* STEP 2: Installation Method */}
              {currentStep === 2 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Wrench className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold">Installation</h2>
                  </div>

                  <form onSubmit={handleInstallationSubmit} className="space-y-6">
                    {/* Installation Method Selection */}
                    <div>
                      <Label className="mb-3 block">Installation Method *</Label>
                      <Tabs value={installationMethod} onValueChange={(v) => setInstallationMethod(v as any)}>
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="technician">Professional Installation</TabsTrigger>
                          <TabsTrigger value="self">Self Installation</TabsTrigger>
                        </TabsList>

                        <TabsContent value="technician" className="space-y-4 mt-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Our certified technicians will install your system at a partner garage.
                          </p>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="vehicleReg">Vehicle Registration *</Label>
                              <Input
                                id="vehicleReg"
                                required={installationMethod === 'technician'}
                                value={installationDetails.vehicleRegistration}
                                onChange={(e) => setInstallationDetails({...installationDetails, vehicleRegistration: e.target.value})}
                                placeholder="KXX 123Y"
                              />
                            </div>

                            <div>
                              <Label htmlFor="vehicleMake">Vehicle Make *</Label>
                              <Input
                                id="vehicleMake"
                                required={installationMethod === 'technician'}
                                value={installationDetails.vehicleMake}
                                onChange={(e) => setInstallationDetails({...installationDetails, vehicleMake: e.target.value})}
                                placeholder="Toyota"
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="vehicleModel">Vehicle Model *</Label>
                            <Input
                              id="vehicleModel"
                              required={installationMethod === 'technician'}
                              value={installationDetails.vehicleModel}
                              onChange={(e) => setInstallationDetails({...installationDetails, vehicleModel: e.target.value})}
                              placeholder="Hilux"
                            />
                          </div>

                          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                              📍 After placing your order, our team will contact you to schedule installation at a nearby partner garage.
                            </p>
                          </div>
                        </TabsContent>

                        <TabsContent value="self" className="mt-4">
                          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                            <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-2">
                              ⚠️ Self-installation is for experienced users only.
                            </p>
                            <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1 ml-4 list-disc">
                              <li>Installation manual will be included</li>
                              <li>Technical support available via phone</li>
                              <li>Warranty valid only with proper installation</li>
                            </ul>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setCurrentStep(1)}
                      >
                        Back
                      </Button>
                      <Button type="submit" size="lg">
                        Continue to Payment
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* STEP 3: Payment */}
              {currentStep === 3 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold">Payment Method</h2>
                  </div>

                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    <Tabs value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as any)}>
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="mpesa">M-PESA</TabsTrigger>
                        <TabsTrigger value="card">Card</TabsTrigger>
                        <TabsTrigger value="bank">Bank</TabsTrigger>
                      </TabsList>

                      <TabsContent value="mpesa" className="space-y-4 mt-4">
                        <div>
                          <Label htmlFor="mpesaPhone">M-PESA Phone Number *</Label>
                          <Input
                            id="mpesaPhone"
                            type="tel"
                            required={paymentMethod === 'mpesa'}
                            value={paymentDetails.mpesaPhone}
                            onChange={(e) => setPaymentDetails({...paymentDetails, mpesaPhone: e.target.value})}
                            placeholder="+254 712 345 678"
                          />
                          <p className="text-sm text-gray-500 mt-2">
                            You'll receive an M-PESA prompt to complete payment
                          </p>
                        </div>
                      </TabsContent>

                      <TabsContent value="card" className="space-y-4 mt-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number *</Label>
                          <Input
                            id="cardNumber"
                            required={paymentMethod === 'card'}
                            value={paymentDetails.cardNumber}
                            onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="cardExpiry">Expiry Date *</Label>
                            <Input
                              id="cardExpiry"
                              required={paymentMethod === 'card'}
                              value={paymentDetails.cardExpiry}
                              onChange={(e) => setPaymentDetails({...paymentDetails, cardExpiry: e.target.value})}
                              placeholder="MM/YY"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cardCvv">CVV *</Label>
                            <Input
                              id="cardCvv"
                              required={paymentMethod === 'card'}
                              value={paymentDetails.cardCvv}
                              onChange={(e) => setPaymentDetails({...paymentDetails, cardCvv: e.target.value})}
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="bank" className="mt-4">
                        <div className="bg-gray-50 dark:bg-gray-900 border rounded-lg p-4">
                          <p className="text-sm mb-2 font-medium">Bank Transfer Details:</p>
                          <div className="text-sm space-y-1">
                            <p>Bank: <span className="font-mono">KCB Bank</span></p>
                            <p>Account: <span className="font-mono">1234567890</span></p>
                            <p>Account Name: <span className="font-mono">COLTECH LTD</span></p>
                          </div>
                          <p className="text-sm text-gray-500 mt-3">
                            Please use your order number as reference when making payment.
                          </p>
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="flex justify-between pt-4">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setCurrentStep(2)}
                        disabled={isProcessing}
                      >
                        Back
                      </Button>
                      <Button 
                        type="submit" 
                        size="lg"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>Complete Order</>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg border p-6 sticky top-24">
                <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-4">
                  {cart.map((item: any) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium">
                        KES {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-medium">KES {cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Installation</span>
                    <span className="font-medium">
                      {installationMethod === 'technician' ? 'KES 5,000' : 'Free'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">
                      KES {(cartTotal + (installationMethod === 'technician' ? 5000 : 0)).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t space-y-2 text-xs text-gray-500">
                  <p className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Secure checkout
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    12-month free license
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Money-back guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}