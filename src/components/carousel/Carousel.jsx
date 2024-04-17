import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import Rating from "../Rating/Rating";
import Genres from "../genres/Genres";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import "./style.scss";

const Carousel = ({ data, loading, endpoint, title }) => {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel my-[50px]">
      <ContentWrapper>
        {title && <h2 className="text-2xl text-white mb-[20px]">{title}</h2>}
        <BsFillArrowLeftCircleFill
          className="left-[30px] arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="right-[30px] arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div
                  key={item.id}
                  className="carouselItem"
                  onClick={() =>
                    navigate(`/${item.media_type || endpoint}/${item.id}`)
                  }
                >
                  <div className="posterBlock relative w-full flex justify-end items-end ">
                    <Img src={posterUrl} />

                    <Genres data={item.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="textBlock text-white flex flex-col ">
                  <div className="title text-lg ">{item.title || item.name}</div>
                    <div className="flex gap-2 items-center">
                      <span className="opacity-50 text-md">
                        {dayjs(item.release_date || item.first_air_date).format(
                          "YYYY"
                        )}
                      </span>
                      <div
                        className={`flex items-center ${
                          item.vote_average.toFixed(1) < 5
                            ? "bg-red-400"
                            : item.vote_average.toFixed(1) < 7
                            ? "bg-orange-400"
                            : "bg-green-400"
                        } text-xs p-[2px] rounded`}
                      >
                        <span>
                          <FaRegStarHalfStroke />
                        </span>
                        <span>{item.vote_average.toFixed(1) / 2}</span>
                      </div>
                    </div>
          
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
