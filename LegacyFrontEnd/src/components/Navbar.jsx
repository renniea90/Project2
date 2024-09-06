import '../CSS/Navbar.css'; // Ensure you create this CSS file in the appropriate location
import useStore from '../store/store';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const { email, isAuthenticated, isAdmin } = useStore((state) => ({
    email: state.email,
    isAuthenticated: state.isAuthenticated,
    isAdmin: state.isAdmin,
  }));

  console.log('Navbar Render - Email:', email);
  console.log('Navbar Render - IsAuthenticated:', isAuthenticated);
  console.log('Navbar Render - IsAdmin:', isAdmin);

  const setIsAuthenticated = useStore((state) => state.setIsAuthenticated);
  const setEmail = useStore((state) => state.setEmail);
  const setIsAdmin= useStore((state) => state.setIsAdmin);

  const handleLogout = () => {
    setIsAuthenticated(false); // Log out the user
    setEmail('');     
    setIsAdmin(false);         // Clear the stored email
    navigate('/');
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1>SAHARA</h1>
        <div className="navbar-links">
          <a href="/">HOME</a>
          {isAuthenticated ? (
            <div className="navbar-right">
              {isAdmin && (
                <a href="/admin">ADMIN</a>
              )}
              <span>Welcome, {email}</span>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
              >
                <i className="fas fa-sign-out-alt"></i> Logout
              </a>
            </div>
          ) : (
            <div className="navbar-right">
              <a href="/login">
                <i className="fas fa-sign-in-alt"></i> LOGIN
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;