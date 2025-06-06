import "./productCard.scss";
import { useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import QuantityControl from "./quantityControl";
import toast from "react-hot-toast";
import EditIcon from "@mui/icons-material/Edit";

export default function ProductCard({ item }) {
  const [quantity, setQuantity] = useState(1);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({ ...item, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`Added ${quantity} of ${item.name} to cart`);
  };

  return (
    <div className="product-card-container" key={item.id}>
      <Card className="product-card">
        <CardContent className="product-card-content">
          <Typography variant="h6">{item.name}</Typography>
          <Typography variant="body2" gutterBottom>
            {item.description}
          </Typography>
          <Typography variant="body2">{item.price}$</Typography>
          <QuantityControl setQuantity={setQuantity} quantity={quantity} />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<AddShoppingCartIcon />}
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
          {user.role === "admin" && (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              href={`/item?id=${item.id}&name=${item.name}&description=${item.description}&price=${item.price}`}
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
