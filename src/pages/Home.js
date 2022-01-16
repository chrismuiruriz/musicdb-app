import apiGetter from "../services/apiGetter";

import { useState, useEffect } from "react";

import Header from "../components/Header";
import TrackCard from "../components/TrackCard";

import banner from "../assets/banner.jpg";

function Home() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    apiGetter("chart/0/tracks").then((json) => {
      setTracks(json.data);
    });
  }, []);

  //style object
  const bannerStyle = {
    backgroundImage: `url(${banner})`,
    backgroundSize: "cover",
    backgroundPosition: "bottom",
    backgroundRepeat: "no-repeat",
    window: "100%",
    filter: "sepia(0.7)",
  };

  return (
    <>
      <Header />
      <div className="md:h-56 h-32" style={bannerStyle}>
        &nbsp;
      </div>

      <main className="bg-gradient-to-t from-blue-100">
        <div className="max-w-screen-xl mx-auto px-4 py-8 md:py-12">
          <h1 className="mb-8 text-xl border-b-2 border-purple-600 pb-2 md:pr-4 md:pl-1 inline-block text-purple-900">
            TRENDING
          </h1>

          <div className="md:grid grid-cols-4 gap-8">
            {/* cards here */}
            {tracks.map((track) => (
              <TrackCard track={track} key={track.id} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
