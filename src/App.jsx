import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import GeneratorPage from "./pages/GeneratorPage";
import ResultsPage from "./pages/ResultsPage";
import FavoritsPage from "./pages/FavoritsPage";
// import About from "./components/About";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/about" element={<AboutPage />} /> */}
          <Route path="/generator" element={<GeneratorPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/favorits" element={<FavoritsPage />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;
