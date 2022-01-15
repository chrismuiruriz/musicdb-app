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
  return json;
};

//pages

function Home() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    apiGetter("chart/0/tracks").then((json) => {
      setTracks(json.data);
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

function Artist() {
  let { id } = useParams();

  const [artist, setArtist] = useState({
    name: "",
    picture_big: "",
    nb_album: 0,
    nb_fan: 0,
  });

  const [artistTracks, setArtistTracks] = useState([]);

  const [artistAlbums, setArtistAlbums] = useState([]);

  useEffect(() => {
    apiGetter(`/artist/${id}`).then((json) => {
      setArtist({ ...artist, ...json });
    });
  }, [id]);

  //get the artist tracks
  useEffect(() => {
    apiGetter(`/artist/${id}/top`).then((json) => {
      console.log(json);
      setArtistTracks(json.data);
    });
  }, [id]);

  //get the artist albums
  useEffect(() => {
    apiGetter(`/artist/${id}/albums?limit=50`).then((json) => {
      setArtistAlbums(json.data);
    });
  }, [id]);

  return (
    <>
      <Header />

      <main>
        <div className="flex">
          <div className="mx-auto md:max-w-screen-sm md:h-96 flex flex-col justify-center">
            <h1 className="font-bold md:text-4xl text-2xl mb-6">
              {artist.name}
            </h1>
            <h4 className="md:text-xl text-md mb-6">
              <strong>{artist.nb_fan}</strong> Fans
            </h4>

            <p className="leading-6 text-gray-600">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore.
            </p>
          </div>

          <div className="bg-white w-1/3 p-8 md:h-96">
            <h4 className="md:text-xl text-md mb-6 font-bold">Top Tracks</h4>
            <div className="">
              <ul className="bg-white rounded-lg w-96 text-gray-900">
                {/* show artistTracks */}
                {artistTracks.map((track, idx) => (
                  <li className="pl-2 pr-6 py-4 border-b border-gray-200 w-full rounded-t-lg">
                    <div className="inline-flex">
                      <span>{idx + 1}</span>{" "}
                      <span className="inline-block ml-4">{track.title}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="max-w-screen-xl mx-auto px-4 py-8 md:py-12">
            <h1 className="mb-8 text-lg border-b-2 pb-2 md:pr-4 inline-block">
              Album
            </h1>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
