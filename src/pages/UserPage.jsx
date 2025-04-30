import { useEffect, useState } from "react";
import UserDetails from "../components/userDetails/userDetails";
import { checkInputValue } from "../functions/checkInputValue";
import toast from "react-hot-toast";
import { useEndpoints } from "../endpoints";

export default function UserPage() {
  const { usersEndpoint } = useEndpoints();
  const userId = JSON.parse(localStorage.getItem("user")).id;

  async function handleUserUpdate(data) {
    const filteredUserData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== "")
    );

    if (Object.keys(filteredUserData).length === 0) {
      return toast.error("Please fill in at least one field to update.");
    }

    for (const [key, value] of Object.entries(filteredUserData)) {
      const validationResult = checkInputValue(value, key);
      if (validationResult !== true) {
        return toast.error(validationResult);
      }
    }

    if (
      filteredUserData.password &&
      filteredUserData.password !== data.password_confirmation
    ) {
      return toast.error("Passwords do not match");
    }

    const token = localStorage.getItem("authToken");

    const body = JSON.stringify({
      user: filteredUserData,
    });


    const url = `${usersEndpoint}/${userId}`;
    try{
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body,
      });
  
      const responseData = await response.json();
      
      if(responseData.errors){
        throw new Error(responseData.errors[0]);
      }

      toast.success(responseData.message);
    } catch(error){
      toast.error(error.message);
      console.log(error);
    }
    
  }

  return <UserDetails onSubmit={handleUserUpdate} />;
}
