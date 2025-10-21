import { useCart } from '@/context/CartContext';
import Link from 'next/link';

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item: any) => (
              <li key={item.id}>
                <h3>{item.name}</h3>
                <p>{item.price}</p>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <button onClick={clearCart}>Clear Cart</button>
          <Link href="/checkout">Proceed to Checkout</Link>
        </>
      )}
    </div>
  );
};

export default CartPage;
