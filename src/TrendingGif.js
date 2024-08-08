import React, { useEffect, useContext, useState, useCallback } from "react";
import axios from "axios";
import { GifContext } from "./GifContext";
import Pagination from "./Pagination";
import "./Pagination.css";
import "./TrendingGif.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TrendingGifs = () => {
  console.log("TrendingGifs component rendering");

  const { state, dispatch } = useContext(GifContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const gifsPerPage = 20;

  //   const [gifs, setGifs] = useState([]);
  //   const [loading, setLoading] = useState(true);
  //   const [searchTerm, setSearchTerm] = useState("");

  const fetchGifs = useCallback(
    async (endpoint, params) => {
      dispatch({ type: "SET_LOADING" });
      try {
        const response = await axios.get(endpoint, { params });
        const { data, pagination } = response.data;
        if (params.offset === 0) {
          dispatch({ type: "SET_GIFS", payload: data });
        } else {
          dispatch({ type: "ADD_GIFS", payload: data });
        }
        const totalGifs = pagination.total_count;
        setTotalPages(Math.ceil(totalGifs / gifsPerPage));
      } catch (error) {
        console.log("Error fetching Gifs:", error);
        dispatch({ type: "SET_GIFS", payload: [] });
      }
    },
    [dispatch, gifsPerPage]
  );

  useEffect(() => {
    fetchGifs("https://api.giphy.com/v1/gifs/trending", {
      api_key: "Qcotf8UElFuKMJT1qSgdUZx0A4xADMMI",
      limit: gifsPerPage,
      offset: (currentPage - 1) * gifsPerPage,
      rating: "g",
    });
  }, [fetchGifs, currentPage]);

  const fetchGifsBySearchTerm = async (event) => {
    event.preventDefault();
    dispatch({ type: "RESET_GIFS" });
    fetchGifs("https://api.giphy.com/v1/gifs/search", {
      api_key: "Qcotf8UElFuKMJT1qSgdUZx0A4xADMMI",
      q: state.searchTerm,
      limit: gifsPerPage,
      offset: 0,
      rating: "g",
    });
  };

  const renderSkeletons = () => {
    return Array.from({ length: gifsPerPage }, (_, index) => (
      <Skeleton key={index} width={200} height={200} />
    ));
  };

  const toggleSaveGif = (gif) => {
    const button = document.getElementById(`save-button-${gif.id}`);
    button.classList.add("animate");

    setTimeout(() => {
      button.classList.remove("animate");
    }, 300);

    dispatch({ type: "TOGGLE_SAVE_GIF", payload: gif });
  };

  const toggleLikeGif = (gif) => {
    const buttonId = `like-button-${gif.id}`;
    const button = document.getElementById(buttonId);

    if (!button) {
      console.error(`Button with id ${buttonId} not found`);
      return;
    }

    button.classList.add("animate");

    setTimeout(() => {
      button.classList.remove("animate");
    }, 300);

    dispatch({ type: "TOGGLE_LIKE_GIF", payload: gif });
  };
  return (
    <div>
      <div className="search-container">
        <form onSubmit={fetchGifsBySearchTerm}>
          <input
            type="text"
            value={state.searchTerm}
            onChange={(e) =>
              dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value })
            }
            placeholder="Search GIFs"
          />
          <button type="submit">Search</button>
        </form>
      </div>
      {state.loading ? (
        <div className="gif-container">{renderSkeletons()}</div>
      ) : (
        <div>
          {state.gifs.length === 0 ? (
            <p>No GIFs found.</p>
          ) : (
            <div className="gif-container">
              {state.gifs.map((gif) => (
                <div key={gif.id} className="gif-item">
                  <img src={gif.images.fixed_height.url} alt={gif.title} />
                  <button
                    id={`save-button-${gif.id}`}
                    className="save-button"
                    onClick={() => toggleSaveGif(gif)}
                  >
                    {state.savedGifs.some((savedGif) => savedGif.id === gif.id)
                      ? "Unsave"
                      : "Save"}
                  </button>
                  <button
                    id={`like-button-${gif.id}`}
                    className="like-button"
                    onClick={() => toggleLikeGif(gif)}
                  >
                    <i
                      className={
                        state.likedGifs.some(
                          (likedGif) => likedGif.id === gif.id
                        )
                          ? "fas fa-heart"
                          : "far fa-heart"
                      }
                    ></i>
                  </button>
                </div>
              ))}
              {totalPages > 1 && (
                <div className="pagination-container">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrendingGifs;
