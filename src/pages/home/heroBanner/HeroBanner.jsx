import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import "./style.scss";

import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  // for getting background image
  const [background, setBackground] = useState("");
  const { url } = useSelector((state) => state.home);

  // for setting quries of search box
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const { data, loading } = useFetch("/movie/upcoming");

  // getting random background image from array of 20
  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="flex items-center w-full h-[350px] md:h-[450px] relative heroBanner px-2">
      {!loading && (
        <div className="backdrop-img w-full h-full absolute top-0 left-0 opacity-50 truncate">
          <Img src={background} />
        </div>
      )}

      <div className="opacity-layer absolute bottom-0 left-0 h-[100px] w-full "></div> 
      <ContentWrapper>
        <div className="flex flex-col justify-center text-white items-center my-0 mx-auto max-w-[800px] relative heroBannerContent ">
          <span className="text-4xl font-bold mb-2">Welcome.</span>
          <span className="text-md font-light mb-2">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="flex justify-center items-center w-full searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show...."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
              className="h-[40px] md:h-[50px] outline-0 border-0 px-2 text-lg text-blue-600"
            />
              <button className="cursor-pointer w-[80px] md:w-[120px] text-lg  h-[40px] md:h-[50px] flex justify-center items-center bg-[#fc4747] text-white">
                <FaSearch />
              </button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
