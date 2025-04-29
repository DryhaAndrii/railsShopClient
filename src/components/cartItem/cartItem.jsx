import { useState } from "react";
import "./CartItem.scss";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CartItem({ item, cartUpdate }) {
  const [quantity, setQuantity] = useState(item.quantity);

  const updateCart = (newQuantity) => {
    if (newQuantity < 1) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = cart.map((i) =>
      i.id === item.id ? { ...i, quantity: newQuantity } : i
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setQuantity(newQuantity);
    cartUpdate();
  };

  const handleRemove = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = cart.filter((i) => i.id !== item.id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    cartUpdate();
  };

  return (
    <div className="cart-item">
      <span>{item.name}</span>
      <div className="controls">
        <Button
          variant="contained"
          onClick={() => updateCart(quantity - 1)}
          disabled={quantity <= 1}
        >
          -
        </Button>
        <span>{quantity}</span>
        <Button variant="contained" onClick={() => updateCart(quantity + 1)}>
          +
        </Button>
      </div>
      <span>{(item.price * quantity).toFixed(2)}$</span>
      <Button
        endIcon={<DeleteIcon />}
        variant="contained"
        color="error"
        onClick={handleRemove}
      >
        Delete
      </Button>
    </div>
  );
}
