import "./userCard.scss";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function UserCard({ user }) {
  const navigate = useNavigate();

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
      </CardContent>
    </Card>
  );
}
