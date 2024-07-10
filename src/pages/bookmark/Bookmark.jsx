import { useState, useEffect } from "react";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import { useSelector } from "react-redux";
import MovieCard from "../../components/movieCard/MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { IoArrowBackSharp } from "react-icons/io5";
import "./style.scss";
import Spinner from "../../components/spinner/Spinner";
import { Link, useNavigate } from "react-router-dom";

import { axiosInstance } from "../../helper/axiosInstancs";
import useFetch from "../../hooks/useFetch";
const Bookmark = () => {
  const [movieData, setMovieData] = useState([]);
  const [tvData, setTvData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userData } = useSelector((state) => state.auth);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  let navigate = useNavigate();

  console.log(movieData);
  const fetchData = () => {
    axiosInstance
      .get(`/user/getuser/${userData?.useremail}`)
      .then((response) => {
        setTvData(response.data.tv);
        setMovieData(response.data.movie);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    setLoading(true);
    isAuthenticated && fetchData(); // Call fetchData function by adding parentheses ()
    setLoading(false);
  }, [isAuthenticated]);
  console.log(tvData, movieData);
  return (
    <div className="explorePage px-2">
      <ContentWrapper>
        <div className="text-2xl w-[30px] h-[30px] flex justify-center items-center font-bold p-1 mb-2 text-white cursor-pointer border rounded-full hover:bg-white hover:text-[#5a698f] transition duration-300 ease-in-out">
          <IoArrowBackSharp onClick={() => navigate(-1)} />
        </div>
      </ContentWrapper>
      {isAuthenticated ? (
        <div>
          <ContentWrapper>
            <h2 className="text-2xl text-white mb-2">Bookmarked Movies</h2>
            {loading && <Spinner initial={true} />}
            {!loading && (
              <>
                {movieData?.length > 0 ? (
                  <InfiniteScroll
                    className="content"
                    dataLength={movieData?.length || []}
                    loader={<Spinner />}
                  >
                    {movieData?.map((item, index) => (
                      <MovieCardWithFetch
                        key={index}
                        mediaType={item?.mediaType}
                        id={item?.id}
                        fetchData={fetchData}
                      />
                    ))}
                  </InfiniteScroll>
                ) : (
                  <span className="resultNotFound">No Bookmarked Movies</span>
                )}
              </>
            )}
          </ContentWrapper>
          <ContentWrapper>
            <h2 className="text-2xl text-white mb-2">Bookmarked Tv shows</h2>
            {loading && <Spinner initial={true} />}
            {!loading && (
              <>
                {tvData?.length > 0 ? (
                  <InfiniteScroll
                    className="content"
                    dataLength={tvData?.length || []}
                    loader={<Spinner />}
                  >
                    {tvData?.map((item, index) => {
                      if (item.media_type === "person") return;
                      return (
                        <MovieCardWithFetch
                          key={index}
                          mediaType={item?.mediaType}
                          id={item?.id}
                          fetchData={fetchData}
                        />
                      );
                    })}
                  </InfiniteScroll>
                ) : (
                  <span className="resultNotFound">No Bookmarked Tv shows</span>
                )}
              </>
            )}
          </ContentWrapper>
        </div>
      ) : (
        <ContentWrapper>
          <div className=" text-white">
            <h1 className="text-3xl mb-3">
              Login to bookmark Movies abd Tv shows
            </h1>
            <Link to={"/signin"} className="underline">
              Click here to login{" "}
            </Link>
          </div>
        </ContentWrapper>
      )}
    </div>
  );
};

const MovieCardWithFetch = ({ mediaType, id, fetchData }) => {
  const { data } = useFetch(`/${mediaType}/${id}`);
  console.log(data);
  return (
    <MovieCard
      data={data}
      mediaType={mediaType}
      bookmarked="true"
      fetchData={fetchData}
    />
  );
};

export default Bookmark;
