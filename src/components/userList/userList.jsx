// src/components/userList/UserList.jsx
import UserCard from "./userCard/userCard";
import "./userList.scss";

export default function UserList({ users }) {
  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
