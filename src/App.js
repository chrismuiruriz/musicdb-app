import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.scss";

import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Artist from "./pages/Artist";

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

export default App;
