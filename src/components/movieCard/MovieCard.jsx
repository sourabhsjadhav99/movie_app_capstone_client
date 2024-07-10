import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";
import Img from "../lazyLoadImage/Img";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { axiosInstance } from "../../helper/axiosInstancs";
import { BsBookmarkPlus, BsBookmarkCheck } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MovieCard = ({ data, fromSearch, mediaType, bookmarked, fetchData }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { userData } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      try {
        if (isAuthenticated) {
          const response = await axiosInstance.get(`/media/check/${data?.id}`, {
            params: { email: userData?.useremail },
          });
          setIsBookmarked(response.data?.bookmarked);
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkBookmarkStatus();
  }, [data?.id, isAuthenticated, userData, isBookmarked, fetchData]);

  const posterUrl = data?.poster_path
    ? url.poster + data?.poster_path
    : PosterFallback;

  let handleBookmark = async (e) => {
    e.stopPropagation();
    if (isAuthenticated) {
      let { id } = data;
      try {
        let response = await axiosInstance.post("/media/toggleBookmark/", {
          id,
          mediaType: mediaType,
          email: userData?.useremail,
        });
        setIsBookmarked(response.data?.bookmarked);
        fetchData();
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/signin");
    }
  };

  return (
    <>
      <div
        className="movieCard relative flex flex-col items-center justify-center"
        onClick={() => {
          navigate(`/${data?.media_type || mediaType}/${data?.id}`);
        }}
      >
        <div className="bookmark-button lg:hidden  w-[35px] h-[35px] flex justify-center items-center absolute border-2 top-3 left-3 rounded-full overflow-hidden z-50 ">
          {isBookmarked ? (
            <button
              onClick={handleBookmark}
              className={` rounded-full p-1 text-2xl text-white bg-green-400  hover:bg-red-500`}
            >
              <BsBookmarkCheck />
            </button>
          ) : (
            <button
              onClick={handleBookmark}
              className={` rounded-full p-1 text-2xl text-white hover:bg-orange-400 `}
            >
              <BsBookmarkPlus />
            </button>
          )}
        </div>

        <div className="posterBlock z-0">
          <Img className="posterImg z-0" src={posterUrl} />
          {!fromSearch && data?.genre_ids?.length > 0 ? (
            <React.Fragment>
              <Genres data={data?.genre_ids?.slice(0, 2)} />
            </React.Fragment>
          ) : (
            <div>na</div>
          )}
        </div>
        <div className="textBlock">
          <span className="title">{data?.title || data?.name}</span>
          <div className="flex gap-2 items-center">
            <span className="date">
              {dayjs(data?.release_date).format("YYYY")}
            </span>

            <div
              className={`flex items-center ${
                data?.vote_average.toFixed(1) < 5
                  ? "bg-red-400"
                  : data?.vote_average.toFixed(1) < 7
                  ? "bg-orange-400"
                  : "bg-green-400"
              } text-xs p-[2px] rounded`}
            >
              <span>
                <FaRegStarHalfStroke />
              </span>
              <span>{data?.vote_average?.toFixed(1) / 2}</span>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default MovieCard;
