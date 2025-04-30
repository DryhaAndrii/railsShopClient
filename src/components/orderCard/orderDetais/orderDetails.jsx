import { List, ListItem, ListItemText } from "@mui/material";
import "./orderDetails.scss";

export default function OrderDetails({ items = [], description = [] }) {
  return (
    <List className="order-details">
      {items.map((item, index) => (
        <ListItem key={item.id} className="order-details-item">
          <ListItemText
            primary={`${item.name} x ${description[index]?.quantity}`}
            secondary={`Price: ${item.price}$ x ${description[index]?.quantity} = ${item.price * description[index]?.quantity}$`}
          />
        </ListItem>
      ))}
    </List>
  );
}
