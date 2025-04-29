import { useState, useEffect } from "react";
import CartItem from "../../components/cartItem/cartItem";
import CartSummary from "../../components/cartSummary/cartSummary";
import "./CartPage.scss";

export default function CartPage() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const cartUpdate = () => {
    const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(updatedCart);
  };

  useEffect(() => {
    cartUpdate();
  }, []);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cart.length > 0 ? (
          cart.map((item) => <CartItem key={item.id} item={item} cartUpdate={cartUpdate}/>)
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <CartSummary cart={cart} />
    </div>
  );
}
