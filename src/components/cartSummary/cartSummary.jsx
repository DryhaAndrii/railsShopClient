import toast from "react-hot-toast";
import "./CartSummary.scss";
import { Button } from "@mui/material";

export default function CartSummary({ cart }) {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    toast.success("The order has been placed! You can see it on the order page.");
  };

  return (
    <div className="cart-summary">
      <h2>Summary: {total}$</h2>
      <Button disabled={total === 0} variant="contained" onClick={handleCheckout}>Place order</Button>
    </div>
  );
}
