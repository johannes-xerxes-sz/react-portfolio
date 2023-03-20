import React, { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch('http://localhost:5001/api/v1/user');
      const data = await response.json();
      console.log(data)
      setUsers(data);
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.userName}
            {user._id}
            </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
