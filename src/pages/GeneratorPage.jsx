import React from "react";
import { useState } from "react";
import GeneratorBox from "../components/GeneratorBox";
import Button from "../components/Button";

import RangeButton from "../components/RangeButton";

function GeneratorPage() {
  const [artistID, setArtistID] = useState("");
  const [danceMin, setDanceMin] = useState(null);
  const [danceMax, setDanceMax] = useState(null);
  const getDanceability = (min, max) => {
    setDanceMin(min);
    setDanceMax(max);
    console.log(min, max);
  };
  const getArtistId = (chosenArtistId) => {
    setArtistID(chosenArtistId);
  };
  return (
    <>
      <GeneratorBox />

      <RangeButton getDanceability={getDanceability} />
    </>
  );
}

export default GeneratorPage;
