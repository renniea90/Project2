import '../CSS/Navbar.css';// Ensure you create this CSS file in the appropriate location

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1>SAHARA</h1>
        <div className="navbar-links">
          <a href="/shop">HOME</a>
          <a href="/admin">ADMIN</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;