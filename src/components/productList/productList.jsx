import React, { useState, useEffect } from "react";
import "./productList.scss";
import { useEndpoints } from "../../endpoints";
import ProductCard from "../productCard/productCard";

const PER_PAGE = 10;

export default function ProductList({ page, setHasMore }) {
  const [items, setItems] = useState([]);
  const { getAllItemsEndpoint } = useEndpoints();

  useEffect(() => {
    if (items.length < PER_PAGE) return setHasMore(false);
    setHasMore(true);
  }, [items]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${getAllItemsEndpoint}?page=${page}&per_page=${PER_PAGE}`;
      const token = localStorage.getItem("authToken");
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setItems(data || []);
    };

    fetchData();
  }, [page]);

  return (
    <div className="product-list">
      {items.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
}
