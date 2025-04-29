import { Button } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";


export default function HeaderLinks({ user }) {
  return (
    <>
      {user?.role === "admin" && (
        <>
          <Button endIcon={<GroupIcon />} href="/users" variant="contained">
            Users
          </Button>
        </>
      )}
      <Button endIcon={<ShoppingCartIcon />} href="/cart" variant="contained">
        Cart
      </Button>
      <Button endIcon={<CategoryIcon />} href="/orders" variant="contained">
        Orders
      </Button>
    </>
  );
}
