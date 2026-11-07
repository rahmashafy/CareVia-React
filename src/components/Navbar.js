import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <h2 className="logo">
        Care<span>Via</span>
      </h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>

      <Link to="/registration" className="nav-button">
        Get Started
      </Link>

    </nav>
  );
}

export default Navbar;