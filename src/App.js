import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import ProductManagement from './ProductManagement';
import StockManagement from './StockManagement';
import UserManagement from './UserManagement';
import Login from './Login';
import logo from './download.png';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

 

  // Check if the user session is already available via a mock API call
  useEffect(() => {
    // Mock API to check session status (this should be a real API in production)
    fetch('/api/check-session', {
      method: 'GET',
      credentials: 'include', // to send cookies with requests (if your backend uses cookies)
    })
      .then(response => response.json())
      .then(data => {
        if (data.user) {
          setCurrentUser(data.user); // Set user if session is valid
        }
      })
      .catch(err => console.error('Error fetching session:', err));
  }, []);

  return (
    
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 className="glow">Welcome to Wings Cafe</h2>
          
        <marquere><p>Choose an option to manage my app.</p></marquere>

<div className="dashboard-buttons">
<Link to="/dashboard">
    <button>Dashboard</button>
  </Link>
  <Link to="/products">
    <button>Product Management</button>
  </Link>
  <Link to="/stocks">
    <button>Stock Management</button>
  </Link>
  <Link to="/users">
    <button>User Management</button>
  </Link>
</div>
        </header>

        <Routes>
          {/* Route to Login if not authenticated */}
          <Route
            path="/"
            element={<Navigate to={currentUser ? '/dashboard' : '/login'} replace />}
          />

          {/* Route for Login Page */}
          <Route
            path="/login"
            element={<Login setCurrentUser={setCurrentUser} />}
          />

          {/* Protected Routes - Only accessible if user is logged in */}
          <Route
            path="/dashboard"
            element={currentUser ? <Dashboard /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/products"
            element={currentUser ? <ProductManagement /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/stocks"
            element={currentUser ? <StockManagement /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/users"
            element={currentUser ? <UserManagement /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
