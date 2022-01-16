import apiGetter from "../services/apiGetter";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/Header";
import TrackCard from "../components/TrackCard";

function SearchResults() {
  let { q } = useParams();

  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    apiGetter(`/search?q=${q}`).then((json) => {
      setTracks(json.data);
    });
  }, [q]);

  return (
    <>
      <Header />

      <main>
        <div className="max-w-screen-xl mx-auto px-4 py-8 md:py-12">
          <h1 className="mb-8 text-lg border-b-2 pb-2 md:pr-4 inline-block">
            Showing results for <span className="font-bold">{q}</span>
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

export default SearchResults;
