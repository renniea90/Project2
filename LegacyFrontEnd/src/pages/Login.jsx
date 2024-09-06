import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Login.css";
import AdminPage from "../pages/Admin";
import useStore from '../store/store';
import ShopPage from "./ShopPage";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setIsAuthenticated = useStore((state) => state.setIsAuthenticated);
  const setIsAdmin = useStore((state) => state.setIsAdmin);
  const setEmailStore = useStore((state) => state.setEmail);
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const isAdmin = useStore((state) => state.isAdmin);

  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/shop');
      }
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.toLowerCase() === 'admin@sahara.com') {
        useStore.getState().setIsAdmin(true);
        useStore.getState().setIsAuthenticated(true); // Ensure admin is authenticated
        navigate('/admin');
        setEmailStore("ADMIN");
        console.log('LOGIN PAGE ad - Email:', email);
        console.log('LOGIN PAGE ad - IsAuthenticated:', isAuthenticated);
        console.log('LOGIN PAGE ad - IsAdmin:', isAdmin);
      } else {
        useStore.getState().setIsAdmin(false);
        useStore.getState().setIsAuthenticated(true);
        setEmailStore(email);
        navigate('/shop');
        console.log('LOGIN PAGE user - Email:', email);
        console.log('LOGIN PAGE user - IsAuthenticated:', isAuthenticated);
        console.log('LOGIN PAGE user - IsAdmin:', isAdmin);
      }

   


  };

  return (
    <div>
    <div classname="create-space">
    </div>
      {!isAuthenticated ? (
        <div className="auth-container">
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email: </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password: </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      ) : isAdmin ? (
        <AdminPage />
      ) : (
        <ShopPage />
      )}
    
    </div>
  );
}

export default LoginPage;