import { Link } from "react-router-dom";
import "./Navbar.css";
import SpotifyLogin from "../components/SpotifyLogin";

function Navbar() {
  return (
    <div className="header">
      <div className="inner">
        <div className="nav-title">
          <h1 className="nav-header">Playlist-Creator</h1>
          <p className="nav-description">This is our awesome playlist.</p>
        </div>
        <div className="newRecipeNavigation">
          <Link to={"/"}>
            <button>Home</button>
          </Link>
          <Link to={"/favorits"}>
            <button>Favoriten</button>
          </Link>
          <SpotifyLogin />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
