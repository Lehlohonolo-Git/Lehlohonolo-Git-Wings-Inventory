import React, { useState, useEffect } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  // Fetch the logged-in users from localStorage
  useEffect(() => {
    const loggedInUsers = JSON.parse(localStorage.getItem('loggedInUsers')) || [];
    setUsers(loggedInUsers);
  }, []);

  // Handle deleting a user
  const deleteUser = (username) => {
    // Remove user from the logged-in users list in localStorage
    const updatedUsers = users.filter((user) => user !== username);
    localStorage.setItem('loggedInUsers', JSON.stringify(updatedUsers));

    // Update state
    setUsers(updatedUsers);
  };

  return (
    <div id="user-management">
      <h2>User Management</h2>

      {/* User List Table */}
      <h3>User List</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Username</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{user}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  <button onClick={() => deleteUser(user)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center', padding: '10px' }}>
                No users available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
