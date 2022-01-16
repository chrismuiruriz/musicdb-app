import { Link } from "react-router-dom";

function TrackCard({ track }) {
  return (
    <div
      key={track.id}
      className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg shadow-lg bg-white max-w-sm  md:mb-0 mb-4 overflow-hidden"
    >
      <div className="relative overflow-hidden">
        <img
          className="rounded-t-lg w-full relative"
          src="https://e-cdns-images.dzcdn.net/images/cover/330da8bf0a57b47c2078db2d3761dc5e/250x250-000000-80-0-0.jpg"
          alt=""
        />
        <div className="cool-text text-3xl text-gray-600 text-center uppercase absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {track.title}
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between flex-col md:flex-row">
          <h3 className="text-gray-100 text-md order-2 md:order-1 font-medium mb-2 mt-2 md:mt-0 md:flex-1">
            {track.title}
          </h3>
          <p className="text-gray-200 text-sm order-1 md:order-2">
            {track.duration}
          </p>
        </div>
        <div className="mb-2">
          <Link
            to={`/artist/${encodeURI(track.artist.id)}`}
            className="text-gray-300 hover:text-blue-300 transition-colors duration-200"
          >
            By {track.artist.name}
          </Link>
        </div>
        <h5 className="text-gray-400 hidden md:inline-block capitalize">
          {track.album.title}
        </h5>
      </div>
    </div>
  );
}

export default TrackCard;
