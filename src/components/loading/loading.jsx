import { CircularProgress, Backdrop } from "@mui/material";

export default function Loading({ isLoading }) {
  return (
    <Backdrop
      open={isLoading}
      sx={{ 
        color: "#fff", 
        zIndex: (theme) => theme.zIndex.modal + 1,
        backdropFilter: "blur(3px)",
      }}
    >
      <CircularProgress color="inherit" size={60} />
    </Backdrop>
  );
}