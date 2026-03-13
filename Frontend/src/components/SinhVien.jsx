import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://cafeshop-t0zr.onrender.com/api/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Users List</h2>

      {users.map((user) => (
        <p key={user.id}>
          {user.id} - {user.ten} - {user.email}
        </p>
      ))}
    </div>
  );
}

export default Users;