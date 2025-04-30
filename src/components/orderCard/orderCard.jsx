import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Collapse,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./orderCard.scss";
import OrderDetails from "./orderDetais/orderDetails";

export default function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card className="order-card">
      <CardContent className="order-header">
        <Typography variant="h6">
          Order from {new Date(order.created_at).toLocaleString()}
        </Typography>
        <Typography variant="body2">
          Total: {order.amount || "unknown"}$
        </Typography>
        <Button
          endIcon={<ExpandMoreIcon />}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Hide Details" : "Show Details"}
        </Button>
      </CardContent>
      <Collapse in={expanded}>
        <OrderDetails items={order.items} description={order.orders_descriptions}/>
      </Collapse>
    </Card>
  );
}
