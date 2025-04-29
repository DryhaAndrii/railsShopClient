import { Button, TextField } from "@mui/material";
import Form from "../form/form";
import "./search.scss";
import { useEndpoints } from "../../endpoints";
import { useState } from "react";
import ProductCard from "../productCard/productCard";
import toast from "react-hot-toast";
export default function Search() {
  const { searchItemEndpoint } = useEndpoints();
  const [items, setItems] = useState([]);
  const fields = [
    {
      component: TextField,
      name: "itemName",
      label: "Item name",
      type: "text",
      required: true,
      inputProps: { maxLength: 48, minLength: 8 },
    },
  ];
  async function search(formData) {
    const url = `${searchItemEndpoint}?query=${formData.itemName}`;
    const token = localStorage.getItem("authToken");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (data.length === 0) toast.error("No items found");
    setItems(data);
  }

  function clear() {
    setItems([]);
  }
  return (
    <div className="search">
      <Form fields={fields} submitForm={search} submitButtonText="Search" />
      {items?.length > 0 && (
        <div className="search-results">
          {items.map((item) => (
            <ProductCard item={item} key={item.id} />
          ))}
        </div>
      )}
      <Button color="primary" variant="contained" onClick={clear}>
        Clear
      </Button>
    </div>
  );
}
