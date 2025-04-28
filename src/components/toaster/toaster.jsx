import { Toaster as Toster } from "react-hot-toast";

export default function Toaster() {
  return (
    <Toster
      position="top-right"
      containerStyle={{ zIndex: "100" }}
      toastOptions={{
        style: {
          top: "10px",
          right: "10px",
          zIndex: "100",
        },
      }}
    />
  );
}
