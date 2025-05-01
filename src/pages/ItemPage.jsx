import toast from "react-hot-toast";
import AddItemForm from "../components/addItemForm/addItemForm";
import { checkInputValue } from "../functions/checkInputValue";
import { useLoading } from "../contexts/Loading.Context";
import { useEndpoints } from "../endpoints";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@mui/material";

export default function ItemPage() {
  const { showLoading, hideLoading } = useLoading();
  const { itemsEndpoint } = useEndpoints();
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const description = searchParams.get("description");
  const price = searchParams.get("price");
  const [item, setItem] = useState({ id, name, description, price });

  const editing = item.id ? true : false;

  async function submitForm(formData) {
    for (let key in formData) {
      const validationResult = checkInputValue(formData[key], key);

      if (validationResult !== true) return toast.error(validationResult);
    }
    const itemData = {
      item: {
        name: formData.name,
        description: formData.description,
        price: formData.price,
      },
    };
    try {
      showLoading();
      const token = localStorage.getItem("authToken");
      const url = editing ? `${itemsEndpoint}/${item.id}` : `${itemsEndpoint}`;
      const method = editing ? "PATCH" : "POST";
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(itemData),
      });

      if (!response.ok) {
        const data = await response.text();
        toast.error(data);
        throw new Error("Item adding error");
      }
      toast.success(editing ? "Item updated" : "Item added");
    } catch (error) {
      console.error(editing ? "Item update error" : "Item adding error", error);
    } finally {
      hideLoading();
    }
  }
  async function deleteItem(){
    try {
      showLoading();
      const token = localStorage.getItem("authToken");
      const url = `${itemsEndpoint}/${item.id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.text();
        toast.error(data);
        throw new Error("Item deleting error");
      }
      toast.success("Item deleted");
    } catch (error) {
      console.error("Item deleting error", error);
    } finally {
      hideLoading();
    }
  }
  return (
    <div className="item-page" style={{maxWidth: "500px", minWidth: "400px", margin: "0 auto"}}>
      <AddItemForm submitForm={submitForm} item={item} />
      {editing && (
        <Button style={{margin: "10px auto",width: "100%"}} variant="contained" onClick={deleteItem}>Delete</Button>
      )}
    </div>
  );
}
