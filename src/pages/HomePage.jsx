import { Link } from "react-router-dom";
import About from "../components/About";
import Header from "../components/Header";

function HomePage() {
  return (
    <>
      <Header />
      <Link to={"/generator"}>
        <button>Generator1</button>
      </Link>

      <About />
    </>
  );
}

export default HomePage;
