import apiGetter from "../services/apiGetter";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/Header";

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
    let isMounted = true;
    apiGetter(`artist/${id}`).then((json) => {
      if (isMounted) setArtist((a) => ({ ...a, ...json }));
    });
    return () => {
      isMounted = false;
    };
  }, [id]);

  //get the artist tracks
  useEffect(() => {
    let isMounted = true;
    apiGetter(`artist/${id}/top`).then((json) => {
      if (isMounted) setArtistTracks((a) => json.data);
    });
    return () => {
      isMounted = false;
    };
  }, [id]);

  //get the artist albums
  useEffect(() => {
    let isMounted = true;
    apiGetter(`artist/${id}/albums`).then((json) => {
      if (isMounted) setArtistAlbums((a) => json.data);
    });
    return () => {
      isMounted = false;
    };
  }, [id]);

  //a helper func to extract year from the date string
  const extractYear = (dateString) => {
    return new Date(dateString).getUTCFullYear();
  };

  return (
    <>
      <Header />

      <main>
        <div
          style={{
            backgroundImage: `url(${artist.picture_xl})`,
          }}
          className="relative md:flex artist-hero md:p-0 p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        >
          <div className="relative z-50 mx-auto md:max-w-screen-sm md:flex flex-col justify-center">
            <h1 className="font-bold md:text-4xl text-2xl mb-6 text-white">
              {artist.name}
            </h1>
            <h4 className="md:text-xl text-md mb-6 text-white">
              <strong>{artist.nb_fan}</strong> fans
            </h4>

            <p className="leading-6 text-gray-300">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore.
            </p>
          </div>

          <div className="relative z-50 bg-white md:w-1/3 md:p-8 py-8">
            <h4 className="md:text-xl text-md mb-4 md:mb-6 font-bold">
              Top Tracks
            </h4>
            <div className="">
              <ul className="bg-white rounded-lg md:w-96 text-gray-900">
                {/* show artistTracks */}
                {artistTracks.map((track, idx) => (
                  <li
                    key={track.id}
                    className="md:pl-2 pr-6 py-4 pt-6 flex justify-between border-b border-gray-200 w-full rounded-t-lg"
                  >
                    <div className="inline-flex">
                      <span>{idx + 1}</span>{" "}
                      <span className="inline-block ml-4">{track.title}</span>
                    </div>
                    <span className="text-gray-600 text-sm">
                      {track.duration}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-t from-blue-100">
          <div className="max-w-screen-xl mx-auto px-4 py-8 md:py-12">
            <h1 className="mb-8 text-xl border-b-2 border-purple-600 pb-2 md:pr-4 md:pl-1 inline-block text-purple-900">
              ALBUMS
            </h1>

            <div className="md:grid grid-cols-4 gap-8">
              {/* show artist albums */}

              {/* show No Albums id artist Album is empy */}

              {artistAlbums.map((album) => (
                <div
                  key={album.id}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg shadow-lg bg-white max-w-sm  md:mb-0 mb-4 overflow-hidden"
                >
                  <div className="relative overflow-hidden">
                    <img
                      className="rounded-t-lg w-full relative"
                      src={album.cover_medium}
                      alt=""
                    />
                    <div className="cool-text text-3xl text-gray-600 text-center uppercase absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      {album.title}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between flex-col md:flex-row">
                      <h3 className="text-gray-100 text-md order-2 md:order-1 font-medium mb-2 md:flex-1">
                        {album.title}
                      </h3>
                    </div>
                    <h5 className="text-gray-200 hidden md:inline-block">
                      {extractYear(album.release_date)}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Artist;
