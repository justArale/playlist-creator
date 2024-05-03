import React from "react";
import RelatedArtists from "../components/RelatedArtists";
import { useLocation } from "react-router-dom";
import LoadResults from "../components/LoadResults";


function ResultsPage() {
  
  return (
    <div className="results-page-container">
      <h1>Results Page</h1>
      <LoadResults />
      <RelatedArtists />
    </div>
  );
}

export default ResultsPage;
