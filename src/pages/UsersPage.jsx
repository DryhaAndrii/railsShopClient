import { useEffect, useState } from "react";
import UserList from "../components/userList/userList";
import { useEndpoints } from "../endpoints";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const { usersEndpoint } = useEndpoints();
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("authToken");
      const res = await fetch(usersEndpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return <UserList users={users} />;
}
