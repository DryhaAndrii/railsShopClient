import { TextField } from "@mui/material";
import Form from "../form/form";

import "./addItemForm.scss";

export default function AddItemForm({ submitForm, item }) {
  const fields = [
    {
      component: TextField,
      name: "name",
      label: "Item name",
      required: true,
      inputProps: { maxLength: 48, minLength: 8 },
      initialValue: item?.name,
    },
    {
      component: TextField,
      name: "description",
      label: "Item description",
      required: true,
      inputProps: { maxLength: 48, minLength: 8 },
      initialValue: item?.description,
    },
    {
      component: TextField,
      name: "price",
      label: "Item price",
      type: "number",
      required: true,
      inputProps: { maxLength: 48, minLength: 8 },
      initialValue: item?.price,
    },
  ];
  return (
    <div className="add-item-form-container">
      <h1>{item.id ? "Edit Item" : "Add a new Item"}</h1>
      <Form
        fields={fields}
        submitForm={submitForm}
        submitButtonText={item.id ? "Edit Item" : "Add item"}
      />
    </div>
  );
}
