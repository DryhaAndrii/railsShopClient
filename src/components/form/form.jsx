import { Box, Button } from "@mui/material";
import { useState } from "react";

export default function Form({ fields, submitForm, submitButtonText = "Submit" }) {
  const [formData, setFormData] = useState(() => {
    const initialData = {};
    fields.forEach((field) => {
      initialData[field.name] = field.initialValue || "";
    });
    return initialData;
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitForm(formData);
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      {fields.map((field) => {
        const { component: Component, name, initialValue, ...props } = field;
        return (
          <Component
            key={name}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            {...props} 
          />
        );
      })}
      <Button variant="contained" color="primary" type="submit">
        {submitButtonText}
      </Button>
    </Box>
  );
}