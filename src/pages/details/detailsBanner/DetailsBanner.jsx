import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { FaRegCirclePlay } from "react-icons/fa6";
import "./style.scss";
import { BsBookmarkPlus, BsBookmarkCheck } from "react-icons/bs";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/Rating/Rating.jsx";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import { MdBookmarkBorder, MdBookmark } from "react-icons/md";
import { axiosInstance } from "../../../helper/axiosInstancs.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DetailsBanner = ({ video, crew, cast }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { mediaType, id } = useParams();

  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const { url } = useSelector((state) => state.home);
  const { userData } = useSelector((state) => state.auth);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const _genres = data?.genres?.map((g) => g.id);

  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      try {
        if (isAuthenticated) {
          const response = await axiosInstance.get(`/media/check/${id}`, {
            params: { email: userData?.useremail },
          });
          setIsBookmarked(response.data.bookmarked);
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkBookmarkStatus();
  }, [id, isAuthenticated, userData]);

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  let handleBookmark = async () => {
    if (isAuthenticated) {
      let { id } = data;
      try {
        let response = await axiosInstance.post("/media/toggleBookmark/", {
          id,
          mediaType: mediaType,
          email: userData?.useremail,
        });
        setIsBookmarked(response.data.bookmarked);
        toast.info(response.data.message, { autoClose: 500 });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error(`Login to bookmark`);
    }
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={url.backdrop + data.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Img
                        className="posterImg"
                        src={url.backdrop + data.poster_path}
                      />
                    ) : (
                      <Img className="posterImg" src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data.name || data.title} (${dayjs(
                        data?.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="subtitle">{data.tagline}</div>

                    <Genres data={_genres} />

                    <div className="row">
                      <CircleRating rating={data.vote_average.toFixed(1)} />
                      <button
                        className="flex p-2 items-center gap-3 text-[#fc4747] border-[#fc4747] rounded-xl border-2  hover:bg-red-300"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video.key);
                        }}
                      >
                        <div className="text-3xl">
                          <FaRegCirclePlay />
                        </div>
                        <span className="text">Watch Trailer</span>
                      </button>

                      {isBookmarked ? (
                        <button
                          onClick={handleBookmark}
                          className={` rounded-full p-1 text-3xl border-2 text-white bg-green-400  hover:bg-red-500`}
                        >
                          <BsBookmarkCheck />
                        </button>
                      ) : (
                        <button
                          onClick={handleBookmark}
                          className={` rounded-full p-1 text-3xl border-2 text-white hover:bg-orange-400 `}
                        >
                          <BsBookmarkPlus />
                        </button>
                      )}
                    </div>

                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>

                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">Status: </span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}
                      {data.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date: </span>
                          <span className="text">
                            {dayjs(data.release_date).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                      {data.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime: </span>
                          <span className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>
                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director: </span>
                        <span className="text">
                          {director?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {director.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer: </span>
                        <span className="text">
                          {writer?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {writer.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                    <div className="info">
                      <div className="text bold">Casts: </div>
                      <div className="flex flex-wrap">
                        {" "}
                        {cast?.map((item, i) => {
                          return (
                            <div className="text " key={i}>
                              {item.name}
                              {cast.length - 1 !== i && ", "}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Creator: </span>
                        <span className="text">
                          {data?.created_by?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {data?.created_by.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default DetailsBanner;
