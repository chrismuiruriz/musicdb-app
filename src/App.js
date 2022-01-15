import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import logo from "./logo.svg";
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

//pages

function Home() {
  return (
    <div>
      <h2>Home</h2>

      <Link to="/artist/123">Artist</Link>
      <Link to={`/search/${encodeURI("Who is there?")}`}>Artist</Link>
    </div>
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
