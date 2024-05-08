import React from "react";
import HomeImage from "..//assets/HomePage_Header.png";
import { Link } from "react-router-dom";

function Header() {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <header
      className="h-screen bg-cover bg-center bg-no-repeat font-semibold md:h-5/6 lg:h-2/5"
      style={{ backgroundImage: `url(${HomeImage})` }}
    >
      <div className="flex w-5/6 items-center py-24 pl-2 text-left sm:h-3/4 md:h-5/6 lg:py-20 xl:py-12">
        <div className="text-left">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-left sm:max-w-xl md:ml-10 md:max-w-md md:pl-4 lg:max-w-2xl xl:ml-28 xl:max-w-3xl xl:py-20">
              <span className="text-sm font-semibold uppercase tracking-widest text-gray-600 md:text-lg">
                React API Integration
              </span>
              <h2 className="mb-8 mt-12 text-2xl font-bold text-gray-900 sm:text-4xl md:mt-8 md:py-6 md:text-4xl md:leading-relaxed lg:mb-4 lg:mt-4 lg:py-6 lg:text-4xl xl:mb-12 xl:mt-10 xl:py-4 xl:text-5xl">
                We'll rock your headphones with a brand new playlist, based on
                your inspiring{" "}
                <span className="text-5xl text-purple-700 underline">
                  Artist
                </span>{" "}
                and{" "}
                <span className="text-5xl text-purple-700 underline">Mood</span>{" "}
                with Spotify.
              </h2>
              <Link
                to={"/generator"} onClick={handleClick}
                className="border-0.5 mb-4 inline-block w-auto rounded-full border-transparent bg-violet-900 px-6 py-4 font-bold text-white transition duration-200 hover:bg-violet-500 md:mr-6 md:w-auto md:px-8 md:py-5 md:text-xl lg:text-2xl xl:mb-0"
              >
                <button>+ CREATE NOW</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
