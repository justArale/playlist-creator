import { Link } from "react-router-dom";
import SpotifyLogin from "./SpotifyLogin";

function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-gray-50 overflow-hidden">
      <div className="flex items-center justify-between mx-auto p-4 h-16 max-w-screen-2xl">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          {/* <img
            src="https://flowbite.com/docs/images/logo.svg"
            class="h-8"
            alt="Our playlist logo"
          /> */}
          <span className="text-2xl font-semibold whitespace-nowrap text-violet-700 mx-4 fixed left-20">
            <Link to="/">Playlist Generator</Link>
          </span>
        </a>

        <div
          className="w-full md:block md:w-auto flex justify-end align-center lg:justify-end"
          id="navbar-solid-bg"
        >
          <ul className="flex font-medium mt-4 rounded-lg bg-gray-50 md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0 mr-4 sm:justify-items-start lg:mr-4">
            <li>
              {/* <Link
                to={"/"}
                className="block text-xl py-2 px-3 md:p-0 text-yellow-500 rounded transition-colors hover:text-purple-600 hover:animate-bounce active:underline"
              >
                Home
              </Link> */}
            </li>
            <li>
              <Link
                to={"/favorites"}
                className="block text-xl py-2 px-3 md:p-0 text-yellow-500 rounded transition-colors hover:text-purple-600 hover:animate-bounce active:underline"
              >
                | Favorites |
              </Link>
            </li>

            <li className="block text-xl py-2 px-3 md:p-0 text-yellow-500 rounded transition-colors hover:text-purple-600 hover:animate-bounce active:underline">
              <SpotifyLogin />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
