import { TextField } from "@mui/material";
import Form from "../../form/form";
import toast from "react-hot-toast";
import { checkInputValue } from "../../../functions/checkInputValue";
import { useEndpoints } from "../../../endpoints";
import { useLoading } from "../../../contexts/Loading.Context";

export default function SignInForm() {
  const { signinEndpoint } = useEndpoints();
  const { showLoading, hideLoading } = useLoading();
  const fields = [
    {
      component: TextField,
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      inputProps: { maxLength: 48, minLength: 8 },
    },
    {
      component: TextField,
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      inputProps: { maxLength: 48, minLength: 8 },
    },
  ];

  const submitForm = async (formData) => {
    //checking inputs values
    for (let key in formData) {
      const validationResult = checkInputValue(formData[key], key);

      if (validationResult !== true) return toast.error(validationResult);
    }

    const userData = {
      user: {
        email: formData.email,
        password: formData.password,
      },
    };

    try {
      showLoading();
      const response = await fetch(signinEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const data = await response.text();
        toast.error(data);
        throw new Error("Registration error");
      }

      const data = await response.json();

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success(data.status.message);

      window.location.reload();
      
    } catch (error) {
      console.error(error);
    } finally {
      hideLoading();
    }
  };

  return (
    <Form fields={fields} submitForm={submitForm} submitButtonText="Sign in" />
  );
}
