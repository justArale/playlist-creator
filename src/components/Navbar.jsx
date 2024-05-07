import { Link } from "react-router-dom";
import SpotifyLogin from "./SpotifyLogin";
import { useState, useEffect } from "react";
import logoIcon from "../assets/icons/logo-round.png";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("accessToken"));

  useEffect(() => {
    window.location.hash && setToken(localStorage.getItem("accessToken"))
  })

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  }
  return (
    <div className="flex items-center justify-between border-b border-violet-500 py-1 font-semibold md:py-2">
      <Link
        to="/"
        className="text-md ml-5 rounded-md bg-violet-900 px-2 py-1 font-bold text-white hover:animate-bounce active:underline md:ml-14 lg:ml-20 lg:px-4 lg:py-3 lg:text-xl xl:ml-36 xl:text-2xl"
      >
        Playlist Generator
      </Link>

      <nav>
        <section className="MOBILE-MENU flex lg:hidden">
          <div
            className="HAMBURGER-ICON mr-8 space-y-1 md:space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 animate-pulse bg-violet-900 lg:h-1"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-violet-900 lg:h-1"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-violet-900 lg:h-1"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="absolute right-0 top-0 px-8 py-4"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="z-50 mr-0 mt-4 h-8 w-8 text-violet-900"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
                strokeWidth="2" //do not remove, the svg is built on this stroke, if remove nothing appears
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* //this draws the two lines diagonally which will build the X for closing */}
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="mt-10 flex min-h-[250px] flex-col items-center justify-between px-4">
              <li className="my-8 uppercase text-violet-700 active:underline">
                <Link to="/generator">Create Playlist</Link>
              </li>
              <li className="my-8 uppercase text-violet-700 active:underline">
                <Link to="/favorites">Favorites</Link>
              </li>
              <ul>
      {!token ? (
        <li className="my-6 uppercase text-violet-700 hover:animate-bounce active:underline xl:text-lg">
          <SpotifyLogin />
        </li>
      ) : (
        <li className="my-6 uppercase text-violet-700 hover:animate-bounce active:underline xl:text-lg" onClick={handleLogout}>Logged in</li>
      )}
    </ul>
            </ul>
          </div>
        </section>

        <ul className="DESKTOP-MENU hidden space-x-8 lg:mr-10 lg:flex xl:mr-16">
          <li className="my-6 uppercase text-violet-700 hover:animate-bounce active:underline xl:text-lg">
            <Link to="/generator">Create Playlist</Link>
          </li>
          <li className="my-6 uppercase text-violet-700 hover:animate-bounce active:underline xl:text-lg">
            <Link to="/favorites">Favorites</Link>
          </li>
          <ul>
      {!token ? (
        <li className="my-6 uppercase text-violet-700 hover:animate-bounce active:underline xl:text-lg">
          <SpotifyLogin />
        </li>
      ) : (
        <li className="my-6 uppercase text-violet-700 hover:animate-bounce active:underline xl:text-lg" onClick={handleLogout}>Logged in</li>
      )}
    </ul>
        </ul>
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 25%;
        // height: 30vh;
        top: 0;
        right: 0;
        background: #e1d9f4;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        // border: 1px solid #4c1d95;
        border-radius: 4%;
      }
    `}</style>
    </div>
  );
}
