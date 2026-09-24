import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <div className="brand-icon">C</div>

        <div>
          <h2>CareerOS</h2>
          <span>AI Career Agent</span>
        </div>
      </Link>

      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/career/profile">Career</Link>
        <Link to="/career/roadmap">Roadmap</Link>
        <Link to="/career/missions">Missions</Link>
        <Link to="/interview">Interview</Link>
      </div>

      <button className="profile-button">
        <span className="profile-avatar">M</span>
        My Profile
      </button>
    </nav>
  );
}

export default Navbar;