import toast from "react-hot-toast";
import "./cartSummary.scss";
import { Button } from "@mui/material";
import { useEndpoints } from "../../endpoints";

export default function CartSummary({ cart,cartUpdate }) {
  const { ordersEndpoint } = useEndpoints();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  async function placeOrder() {
    try {
      const token = localStorage.getItem("authToken");

      const items = cart.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      }));

      const response = await fetch(ordersEndpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to place order");
      }

      const data = await response.json();
      toast.success(
        "The order has been placed! You can see it on the order page."
      );

      //clear cart
      localStorage.removeItem("cart");
      cartUpdate();
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      console.error("Order error:", error);
    }
  }

  return (
    <div className="cart-summary">
      <h2>Summary: {total}$</h2>
      <Button disabled={total === 0} variant="contained" onClick={placeOrder}>
        Place order
      </Button>
    </div>
  );
}
