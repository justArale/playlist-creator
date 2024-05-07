function About() {
  return (
    <div className="flex flex-wrap justify-center mt-10 mb-8">
      {/* First Card */}
      <div className="p-4 max-w-sm">
        <div className="flex rounded-lg h-full bg-[#F6F2FF] p-8 flex-col">
          <div className="flex items-center mb-3">
            <div className="bg-white rounded-full w-10 h-10 flex justify-center items-center">
              <h1 className="text-[#6030BF] text-lg font-medium">1</h1>
            </div>
          </div>
          <div className="flex flex-col justify-between flex-grow">
            <p className="leading-relaxed text-base text-gray-800 font-semibold text-left">Start with any Artist you love and choose the right mood.</p>
          </div>
        </div>
      </div>
      {/* Second Card */}
      <div className="p-4 max-w-sm">
        <div className="flex rounded-lg h-full bg-[#F6F2FF] p-8 flex-col">
          <div className="flex items-center mb-3">
            <div className="bg-white rounded-full w-10 h-10 flex justify-center items-center">
              <h1 className="text-[#6030BF] text-lg font-medium">2</h1>
            </div>
          </div>
          <div className="flex flex-col justify-between flex-grow">
            <p className="leading-relaxed text-base text-gray-800 font-semibold text-left">Based on your choice we will generate the perfect playlist.</p>
          </div>
        </div>
      </div>
      {/* Third Card */}
      <div className="p-4 max-w-sm">
        <div className="flex rounded-lg h-full bg-[#F6F2FF] p-8 flex-col">
          <div className="flex items-center mb-3">
            <div className="bg-white rounded-full w-10 h-10 flex justify-center items-center">
              <h1 className="text-[#6030BF] text-lg font-medium">3</h1>
            </div>
          </div>
          <div className="flex flex-col justify-between flex-grow">
            <p className="leading-relaxed text-base text-gray-800 font-semibold text-left">Preview listen tracks, choose your favorites and save the playlist to your own Spotify library.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
