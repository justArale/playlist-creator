import React from "react";
import HomeImage from "..//assets/HomePage_Header.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header
      className="my-4 h-screen bg-cover bg-center bg-no-repeat font-semibold"
      style={{ backgroundImage: `url(${HomeImage})` }}
    >
      <div className="flex w-full items-center py-4 pl-20 text-left sm:h-3/4 md:h-5/6 lg:h-5/6">
        <div className="text-left">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-left sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
              <span className="font-semibold uppercase tracking-widest text-gray-900">
                React API Integration
              </span>
              <h2 className="mb-12 mt-12 font-bold text-gray-900 sm:text-4xl md:text-5xl lg:text-5xl">
                We'll rock your headphones with a brand new playlist, based on
                your <span className="text-purple-700">Artist</span> and{" "}
                <span className="text-purple-700">Mood</span> with Spotify.
              </h2>
              <Link
                to={"/generator"}
                className="text-xlinline-block text-md mb-4 w-auto rounded-full border-2 border-transparent bg-violet-900 px-8 py-5 font-bold uppercase text-white transition duration-200 hover:bg-violet-500 md:mr-6 md:w-auto"
              >
                <button>+ Create Now</button>
              </Link>
              {/* <a
                className="text-xlinline-block w-auto md:w-auto mb-4 md:mr-6 py-5 px-8 text-md font-bold uppercase border-2 border-transparent bg-violet-900 rounded-full hover:bg-violet-500 text-white transition duration-200"
                href="#"
              >
                + Create Now
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
