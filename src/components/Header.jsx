import React from "react";
import HomeImage from "..//assets/HomePage_Header.png";

function Header() {
  return (
    <header
      className="mb-20 h-screen bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${HomeImage})` }}
    >
      <div className="flex items-center w-full sm:h-3/4 md:h-5/6 lg:h-5/6 py-4 pl-20 text-left">
        <div className="text-left">
          <div className="container px-4 mx-auto">
            <div className="max-w-2xl mx-auto text-left sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
              <span className="text-gray-900 font-semibold uppercase tracking-widest">
                React API Integration
              </span>
              <h2 className="mt-12 mb-12 sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900">
                We'll rock your headphones with a brand new playlist, based on
                your <span className="text-purple-700">Artist</span> and{" "}
                <span className="text-purple-700">Mood</span> with Spotify.
              </h2>
              <a
                className="text-xlinline-block w-auto md:w-auto mb-4 md:mr-6 py-5 px-8 text-md font-bold uppercase border-2 border-transparent bg-violet-900 rounded-full hover:bg-violet-500 text-white transition duration-200"
                href="#"
              >
                + Create Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
