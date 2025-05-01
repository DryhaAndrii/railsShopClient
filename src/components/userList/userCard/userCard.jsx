import "./userCard.scss";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../../contexts/Loading.Context";
import { useEndpoints } from "../../../endpoints";
import toast from "react-hot-toast";

export default function UserCard({ user }) {
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();
  const { usersEndpoint } = useEndpoints();

  const currentUser = JSON.parse(localStorage.getItem("user"));

  async function deleteUser() {
    try {
      showLoading();
      const token = localStorage.getItem("authToken");
      const url = `${usersEndpoint}/${user.id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.text();
        toast.error(data);
        throw new Error("User deleting error");
      }
      toast.success("User deleted");
      window.location.reload();
    } catch (error) {
      console.error("User deleting error", error);
    } finally {
      hideLoading();
    }
  }

  if (currentUser.id === user.id) {
    return null;
  }

  return (
    <Card className="user-card">
      <CardContent>
        <Typography variant="h6">
          {user.first_name} {user.last_name}
        </Typography>
        <Typography>Email: {user.email}</Typography>
        <Typography>Role: {user.role}</Typography>
        <Button
          variant="outlined"
          onClick={() => navigate(`/users/${user.id}`)}
        >
          Edit user
        </Button>
        <Button
          variant="outlined"
          onClick={deleteUser}
          style={{ margin: "0px 10px" }}
        >
          Delete user
        </Button>
      </CardContent>
    </Card>
  );
}
