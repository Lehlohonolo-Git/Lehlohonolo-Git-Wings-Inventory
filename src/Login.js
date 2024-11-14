import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import './App.css';

const Login = ({ setCurrentUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const navigate = useNavigate(); // To navigate to the dashboard

  // Handle Login
  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem(username));

    if (storedUser && storedUser.password === password) {
      setCurrentUser(username); // Set the active user after login
      alert('Login successful!');

      // Get the current list of logged-in users and add the new user
      const loggedInUsers = JSON.parse(localStorage.getItem('loggedInUsers')) || [];
      if (!loggedInUsers.includes(username)) {
        loggedInUsers.push(username);
        localStorage.setItem('loggedInUsers', JSON.stringify(loggedInUsers)); // Save updated list
      }

      navigate('/dashboard'); // Redirect to the dashboard after successful login
    } else {
      alert('Invalid username or password.');
    }
  };

  // Handle Sign-Up
  const handleSignUp = () => {
    if (localStorage.getItem(username)) {
      alert('Username already exists. Please choose another one.');
    } else {
      localStorage.setItem(username, JSON.stringify({ password }));
      alert('Sign-up successful!');
      setCurrentUser(username); // Set active user after successful signup
      navigate('/dashboard'); // Redirect to dashboard after sign-up
    }
  };

  return (
    <div>
      <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          isSignUp ? handleSignUp() : handleLogin();
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
      </form>

      {/* Toggle between Login and Sign-Up */}
      <p>
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
        <span
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? ' Login' : ' Sign Up'}
        </span>
      </p>
    </div>
  );
};

export default Login;
