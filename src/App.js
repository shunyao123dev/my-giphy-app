import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import TrendingGifs from "./TrendingGif";
import SavedGifs from "./savedGif";
import { GifProvider } from "./GifContext";
import "./App.css"; // Import the CSS file

const App = () => {
  return (
    <GifProvider>
      <Router>
        <nav>
          <NavLink to="/" exact activeClassName="active">
            Trending GIFs
          </NavLink>
          <NavLink to="/saved" activeClassName="active">
            Saved GIFs
          </NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<TrendingGifs />} />
          <Route path="/saved" element={<SavedGifs />} />
        </Routes>
      </Router>
    </GifProvider>
  );
};

export default App;
