import React from "react";
import GeneratorBox from "../components/GeneratorBox";
import Button from "../components/Button";

import RangeButton from "../components/RangeButton";

import RelatedArtists from "../components/RelatedArtists";


function GeneratorPage() {
  return (
    <>
      <GeneratorBox />

      <RangeButton />
      <RelatedArtists />
    </>
  );
}

export default GeneratorPage;
