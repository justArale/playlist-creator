import "./Navbar.css";

function Navbar() {
  return (
    <div className="header">
      <div className="inner">
        <div className="nav-title">
          <h1 className="nav-header">Playlist-Creator</h1>
          <p className="nav-description">This is our awesome playlist.</p>
        </div>
        <div className="newRecipeNavigation">
          <button className="addRecipe-button">
            <a href="/">homepage</a>
          </button>
          <button className="addRecipe-button">
            <a href="/about">about us</a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
