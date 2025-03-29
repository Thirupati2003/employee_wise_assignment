import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import UserList from './components/UserList';
import EditUser from './components/EditUser';
import Navbar from './components/NavBar';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      <div className="container">
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/users" /> : <Login onLogin={handleLogin} />} 
          />
          <Route 
            path="/users" 
            element={isAuthenticated ? <UserList /> : <Navigate to="/" />} 
          />
          <Route 
            path="/users/:id/edit" 
            element={isAuthenticated ? <EditUser /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;