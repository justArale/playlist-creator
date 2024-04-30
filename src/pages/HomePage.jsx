import { Link } from "react-router-dom";
import About from "../components/About";

function HomePage() {
  return (
    <>
      <h1>Homepage</h1>
      <Link to={"/generator"}>
        <button>Generator</button>
      </Link>
      <About />
    </>
  );
}

export default HomePage;
