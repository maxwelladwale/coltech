'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const [paymentInfo, setPaymentInfo] = useState({});

  const handlePayment = async () => {
    // Handle payment integration (e.g., using Stripe)
    // After successful payment:
    clearCart();
  };

  return (
    <div>
      <h1>Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div>
            <h2>Order Summary</h2>
            <ul>
              {cart.map((item: any) => (
                <li key={item.id}>
                  <h3>{item.name}</h3>
                  <p>{item.price}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment form */}
          <form onSubmit={handlePayment}>
            <input
              type="text"
              placeholder="Card number"
              onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
            />
            <button type="submit">Pay Now</button>
          </form>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
