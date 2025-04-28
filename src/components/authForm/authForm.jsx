import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import SignUpForm from "./signUpForm/signUpForm";
import SignInForm from "./signInForm/signInForm";
import "./authForm.scss";

export default function AuthForm() {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <div className="authFormWrapper">
      <Box className="authForm">
        <Tabs className="tabs" value={tab} onChange={handleChange} centered>
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>

        <Box>
          {tab === 0 && <SignInForm />}
          {tab === 1 && <SignUpForm />}
        </Box>
      </Box>
    </div>
  );
}
