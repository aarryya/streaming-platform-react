import "./NavBar.css";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { logout } from "../../services/firebase";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h1>hotstar</h1>
      </div>

      <ul className="nav-links">
        <li>TV</li>
        <li>Movies</li>
        <li>Sports</li>
        <li>Disney+</li>
        <li>Kids</li>
      </ul>

      <div className="nav-right">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search" />
        </div>
        <FaBell className="nav-icon" />
        {user ? (
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <FaUserCircle className="profile-icon" />
        )}
      </div>
    </nav>
  );
}

export default NavBar;
