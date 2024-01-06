import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../styles/navigation.sass";
import "./../App.sass"
import { AuthContext } from "../authContext";
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import Hamburger from "./hamburger";

const Navigation = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const { signedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 30);
    });
  });

  const handleLogout = () => {
    if (hamburgerOpen) setHamburgerOpen(false);
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleHamburgerChange = (isHamburgerOpen: boolean) => {
    setHamburgerOpen(isHamburgerOpen);
  };

  const handleDropdownMenuClose = () => {
    if (hamburgerOpen) setHamburgerOpen(false);
  };

  return (
    <header className={`nav-wrapper ${scroll || hamburgerOpen ? "navigation-sticky" : ""}`}>
      <div className="nav-container">
        <span className="nav-logo">
          <Link to="/" onClick={handleDropdownMenuClose}>luciecestuje</Link>
        </span>
        <nav className="nav-links">
          <Link to="/cesty" className="nav-travels nav-link">
            CESTY
          </Link>
          <Link to="/onas" className="nav-about nav-link">
            O NÁS
          </Link>
          <Link to="/zdena" className="nav-zdena nav-link">
            ZDENA
          </Link>
          <Link to="/" className="nav-home nav-link">
            DOMŮ
          </Link>
          {signedIn && (
            <span className="nav-signout nav-link" onClick={handleLogout}>
              ODHLÁSIT
            </span>
          )}
        </nav>

        <Hamburger isHamburgerOpen={hamburgerOpen} onChange={handleHamburgerChange}/>

      </div>
      {hamburgerOpen && (
        <div className="nav-dropdown-menu">
          <Link to="/cesty" className="nav-travels nav-link" onClick={handleDropdownMenuClose}>
            CESTY
          </Link>
          <Link to="/onas" className="nav-about nav-link" onClick={handleDropdownMenuClose}>
            O NÁS
          </Link>
          <Link to="/zdena" className="nav-zdena nav-link" onClick={handleDropdownMenuClose}>
            ZDENA
          </Link>
          <Link to="/" className="nav-home nav-link" onClick={handleDropdownMenuClose}>
            DOMŮ
          </Link>
          {signedIn && (
            <span className="nav-signout nav-link" onClick={handleLogout}>
              ODHLÁSIT
            </span>
          )}
        </div>
      )}
    </header>
  );
};

export default Navigation;
