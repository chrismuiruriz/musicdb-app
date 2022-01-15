// import useEffect from react

import { useState, useEffect } from "react";

// import useState from react

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import "./App.scss";

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
  //console.log(apiGetter("chart/0/tracks"));

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
      <header className="bg-white shadow-md shadow-zinc-100 py-4">
        <div className="max-w-screen-xl mx-auto px-4 flex items-stretch">
          <div>
            <img
              src="https://via.placeholder.com/400x200"
              className="App-logo h-14 md:h-16 w-auto"
              alt="logo"
            />
          </div>

          <div className="flex-1 flex items-stretch md:pl-12">
            <div className="flex items-center pr-4">
              <svg
                className="text-gray-400 h-6 w-6 fill-current"
                viewBox="0 0 56.966 56.966"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </div>

            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none text-xl tracking-wide"
            />
          </div>
        </div>
      </header>

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

      {/* <Link to="/artist/123">Artist</Link>
      <Link to={`/search/${encodeURI("Who is there?")}`}>Artist</Link> */}
    </>
  );
}

function SearchResults() {
  let { q } = useParams();

  return (
    <div>
      <h2>Search Results for {q}</h2>
    </div>
  );
}

function Artist() {
  let { id } = useParams();
  return (
    <div>
      <h2>Artist {id}</h2>
    </div>
  );
}

export default App;
