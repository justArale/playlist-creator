import React, { useState } from "react";
import GeneratorBox from "../components/GeneratorBox";
import SavePlaylistOnSpotify from "../components/SavePlaylistOnSpotify";

function GeneratorPage() {
  return (
    <div className="generator flex items-center justify-center">
      <GeneratorBox />
      <SavePlaylistOnSpotify />
    </div>
  );
}

export default GeneratorPage;
