// src/components/userList/UserList.jsx
import UserCard from "./userCard/userCard";
import "./userList.scss";

export default function UserList({ users }) {
  return (
    <div className="user-list">
      <h1>Users list</h1>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
