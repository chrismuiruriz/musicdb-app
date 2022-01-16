import apiGetter from "../services/apiGetter";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/Header";
import TrackCard from "../components/TrackCard";

function SearchResults() {
  let { q } = useParams();

  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    let isMounted = true;

    apiGetter(`/search?q=${q}`).then((json) => {
      if (isMounted) setTracks(json.data);
    });

    return () => {
      isMounted = false;
    };
  }, [q]);

  return (
    <>
      <Header />

      <main className="bg-gradient-to-t from-blue-100">
        <div className="max-w-screen-xl mx-auto px-4 py-8 md:py-12">
          <h1 className="mb-8 text-xl border-b-2 border-purple-600 pb-2 md:pr-4 md:pl-1 inline-block text-purple-900">
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
