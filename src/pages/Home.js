import apiGetter from "../services/apiGetter";

import { useState, useEffect } from "react";

import Header from "../components/Header";
import TrackCard from "../components/TrackCard";

function Home() {
  const [tracks, setTracks] = useState([]);

  console.log(process.env.REACT_APP_SECRET_PROXY_URL);

  useEffect(() => {
    apiGetter("chart/0/tracks").then((json) => {
      setTracks(json.data);
    });
  }, []);

  return (
    <>
      <Header />

      <main>
        <div className="max-w-screen-xl mx-auto px-4 py-8 md:py-12">
          <h1 className="mb-8 text-lg border-b-2 pb-2 md:pr-4 inline-block">
            TRENDING
          </h1>

          <div className="md:grid grid-cols-4 gap-8">
            {/* cards here */}

            {/* loop through the tracks */}

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
