import { useEffect, useState } from "react";
import UserList from "../components/userList/userList";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("authToken");
      const res = await fetch("http://localhost:3000/api/v1/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="users-page">
      <h1>Users Page</h1>
      <UserList users={users} />
    </div>
  );
}
