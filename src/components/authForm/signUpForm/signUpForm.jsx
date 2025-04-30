import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import Form from "../../form/form";
import { checkInputValue } from "../../../functions/checkInputValue";
import toast from "react-hot-toast";
import { useEndpoints } from "../../../endpoints";
import { useLoading } from "../../../contexts/Loading.Context";

export default function SignUpForm() {
  const { signupEndpoint } = useEndpoints();
  const { showLoading, hideLoading } = useLoading();
  const fields = [
    {
      component: TextField,
      name: "firstName",
      label: "First name",
      required: true,
      inputProps: { maxLength: 48, minLength: 8 },
    },
    {
      component: TextField,
      name: "lastName",
      label: "Last name",
      required: true,
      inputProps: { maxLength: 48, minLength: 8 },
    },
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
    {
      component: TextField,
      name: "passwordConfirmation",
      label: "Password confirmation",
      type: "password",
      required: true,
      inputProps: { maxLength: 48, minLength: 8 },
    },
    {
      component: ({ value, onChange, ...props }) => (
        <FormControlLabel
          control={<Checkbox checked={value} onChange={onChange} />}
          label="Admin"
          {...props}
        />
      ),
      name: "isAdmin",
      initialValue: false,
    },
  ];

  const submitForm = async (formData) => {
    //checking inputs values
    for (let key in formData) {
      const validationResult = checkInputValue(formData[key], key);

      if (validationResult !== true) return toast.error(validationResult);
    }
    if (formData.password !== formData.passwordConfirmation) {
      toast.error("Passwords do not match");
      return;
    }
    const userData = {
      user: {
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.passwordConfirmation,
        first_name: formData.firstName,
        last_name: formData.lastName,
        role: formData.isAdmin ? "admin" : "user",
      },
    };

    try {
      showLoading();
      const response = await fetch(signupEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.status.errors);
        throw new Error("Registration error");
      }

      const data = await response.json();
      toast.success(data.status.message);
    } catch (error) {
      console.error(error);
      toast.error("Server error:",error);
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      <Form
        fields={fields}
        submitForm={submitForm}
        submitButtonText="Sign up"
      />
    </>
  );
}
