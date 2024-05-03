import React from "react";
import RelatedArtists from "../components/RelatedArtists";
import { useLocation } from "react-router-dom";
import LoadResults from "../components/LoadResults";

function ResultsPage() {
  return (
    <div className="results-page-container mb-8 py-4">
      <LoadResults />
      <RelatedArtists />
    </div>
  );
}

export default ResultsPage;
