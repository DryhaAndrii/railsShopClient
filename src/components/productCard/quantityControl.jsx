import { IconButton, TextField } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import './quantityControl.scss'

export default function QuantityControl({ setQuantity, quantity }) {
  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="quantity-control">
      <IconButton onClick={decrease}>
        <RemoveIcon />
      </IconButton>
      <TextField
        type="number"
        value={quantity}
        inputProps={{ min: 1 }}
        size="small"
        onChange={(e) => setQuantity(Math.max(1, +e.target.value))}
      />
      <IconButton onClick={increase}>
        <AddIcon />
      </IconButton>
    </div>
  );
}
