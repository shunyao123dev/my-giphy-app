import React, { useContext } from "react";
import { GifContext } from "./GifContext";
import "./TrendingGif.css"; // Reuse the CSS file

const SavedGifs = () => {
  const { state, dispatch } = useContext(GifContext);

  const toggleSaveGif = (gif) => {
    dispatch({ type: "TOGGLE_SAVE_GIF", payload: gif });
  };

  return (
    <div>
      <h2>Saved GIFs</h2>
      <div className="gif-container">
        {state.savedGifs.length === 0 ? (
          <p>No saved GIFs.</p>
        ) : (
          state.savedGifs.map((gif) => (
            <div key={gif.id} className="gif-item">
              <img src={gif.images.fixed_height.url} alt={gif.title} />
              <button onClick={() => toggleSaveGif(gif)}>
                {state.savedGifs.some((savedGif) => savedGif.id === gif.id)
                  ? "Unsave"
                  : "Save"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SavedGifs;
