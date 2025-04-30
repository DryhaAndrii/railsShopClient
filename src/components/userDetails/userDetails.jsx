import { TextField } from "@mui/material";
import "./userDetails.scss";
import Form from "../form/form";

export default function UserDetails({ onSubmit }) {
  const fields = [
    {
      name: "firstName",
      label: "First Name",
      component: TextField,
      fullWidth: true,
    },
    {
      name: "lastName",
      label: "Last Name",
      component: TextField,
      fullWidth: true,
    },
    {
      name: "email",
      label: "Email",
      component: TextField,
      fullWidth: true,
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      component: TextField,
      type: "password",
      fullWidth: true,
    },
    {
      name: "password_confirmation",
      label: "Password confirm",
      component: TextField,
      type: "password",
      fullWidth: true,
    },
  ];

  return (
    <div className="user-details">
      <h2>Update Personal Info</h2>
      <h3>Fill in only the fields you want to change</h3>
      <Form
        fields={fields}
        submitForm={onSubmit}
        submitButtonText="Update Info"
      />
    </div>
  );
}
