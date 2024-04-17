import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";
import Img from "../lazyLoadImage/Img";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import axios from "axios";
import { axiosInstance } from "../../helper/axiosInstancs";
const MovieCard = ({ data, fromSearch, mediaType, bookmarked, fetchData }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : PosterFallback;


    
  let handleDeleteBookmark = async (event) => {
    event.stopPropagation();
    try {
      await axiosInstance.delete(`http://localhost:8000/media/delete/${data._id}`);
      await fetchData()
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div
      className="movieCard"
      onClick={() => {
        navigate(`/${data.media_type || mediaType}/${data.id}`);
      }}
    >
      <div className="posterBlock">
        <Img className="posterImg" src={posterUrl} />
        {!fromSearch && (
          <React.Fragment>
            <Genres data={data.genre_ids.slice(0, 2)} />
          </React.Fragment>
        )}
      </div>
      <div className="textBlock">
        <span className="title">{data.title || data.name}</span>
        <div className="flex gap-2 items-center">
          <span className="date">
            {dayjs(data.release_date).format("YYYY")}
          </span>
          <div
            className={`flex items-center ${
              data.vote_average.toFixed(1) < 5
                ? "bg-red-400"
                : data.vote_average.toFixed(1) < 7
                ? "bg-orange-400"
                : "bg-green-400"
            } text-xs p-[2px] rounded`}
          >
            <span>
              <FaRegStarHalfStroke />
            </span>
            <span>{data.vote_average.toFixed(1) / 2}</span>
          </div>
          {bookmarked === "true" ? (
            <button onClick={handleDeleteBookmark} className="hover:text-[#fc4747] hover:text-xl">
              <FaBookmark />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
