import { useEffect, useState } from "react";
import "./OrdersPage.scss";
import OrderCard from "../../components/orderCard/orderCard";
import { useEndpoints } from "../../endpoints";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const { ordersEndpoint } = useEndpoints();
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("authToken");
      const response = await fetch(ordersEndpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-page">
      <h1>Orders</h1>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
