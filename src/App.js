import { useState, useEffect } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import "./App.scss";

import Header from "./components/Header";
import TrackCard from "./components/TrackCard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:q" element={<SearchResults />} />
        <Route path="/artist/:id" element={<Artist />} />
      </Routes>
    </BrowserRouter>
  );
}

// service
const apiGetter = async (endpoint) => {
  const apiUrl = `http://localhost:8080/https://api.deezer.com/${endpoint}`;
  const res = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();
  return json.data;
};

//pages

function Home() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    apiGetter("chart/0/tracks").then((data) => {
      setTracks(data);
    });
  }, []);

  function TracksCard({ track }) {
    return (
      <div
        key={track.id}
        className="rounded-lg shadow-lg bg-white max-w-sm  md:mb-0 mb-4"
      >
        <div className="relative">
          <img
            className="rounded-t-lg w-full relative"
            src="https://e-cdns-images.dzcdn.net/images/cover/330da8bf0a57b47c2078db2d3761dc5e/250x250-000000-80-0-0.jpg"
            alt=""
          />
          <div className="text-3xl text-gray-600 text-center uppercase absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {track.title}
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between flex-col md:flex-row">
            <h3 className="text-gray-900 text-md order-2 md:order-1 font-medium mb-2 md:flex-1">
              {track.title}
            </h3>
            <p className="text-gray-600 mb:2 md:mb-0 text-sm order-1 md:order-2">
              {track.duration}
            </p>
          </div>
          <div className="mb-2">
            <Link
              to={`/artist/${encodeURI(track.artist.id)}`}
              className="text-gray-600 hover:text-blue-300 transition-colors duration-200"
            >
              By {track.artist.name}
            </Link>
          </div>
          <h5 className="text-gray-700 hidden md:inline-block">
            {track.album.title}
          </h5>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />

      <main>
        <div className="max-w-screen-xl mx-auto px-4 py-8 md:py-12">
          <h1 className="mb-8 text-lg border-b-2 pb-2 md:pr-4 inline-block">
            Top Tracks
          </h1>

          <div className="md:grid grid-cols-4 gap-8">
            {/* cards here */}

            {/* loop through the tracks */}

            {tracks.map((track) => (
              <TracksCard track={track} key={track.id} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

function SearchResults() {
  let { q } = useParams();

  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    apiGetter(`/search?q=${q}`).then((data) => {
      setTracks(data);
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

function Artist() {
  let { id } = useParams();
  return (
    <>
      <Header />

      <main>
        <div className="max-w-screen-xl mx-auto px-4 py-8 md:py-12"></div>
      </main>
    </>
  );
}

export default App;
