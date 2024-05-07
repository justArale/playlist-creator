import "./Footer.css";

function Footer() {
  return (
    <footer className="inset-x-0 bottom-0 mb-2 w-full justify-center bg-white px-3 py-2 text-center text-sm text-gray-900 md:mb-10 md:pb-6 md:text-lg lg:text-2xl ">
      {/* <div className="w-full bg-white text-gray-900 text-center justify-center"> */}
      <p className="footer-credits"><a href="https://github.com/justArale/playlist-creator">
        Spotify Project
      </a>{" "}
      made with 💜 {"   "}by{"  "}
      <a href="https://github.com/annagy07">Anna</a>
      {" | "}
      <a href="https://github.com/justArale">Arale</a>
      {" | "}
      <a href="https://github.com/camialbuq">Cami</a></p>
      {/* </div> */}
    </footer>
  );
}

export default Footer;
