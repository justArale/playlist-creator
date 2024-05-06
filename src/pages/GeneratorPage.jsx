import React, { useState } from "react";
import GeneratorBox from "../components/GeneratorBox";
import SavePlaylistOnSpotify from "../components/SavePlaylistOnSpotify";

function GeneratorPage() {
  return (
    <div className="my-60">
      <GeneratorBox />
      <SavePlaylistOnSpotify />
    </div>
  );
}

export default GeneratorPage;
