import React from "react";
import { useParams } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Carousel from "../../components/carousel/Carousel";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";


const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div className="mx-auto px-2">
      <ContentWrapper>
       
        <DetailsBanner
          video={data?.results?.[0]}
          crew={credits?.crew}
          cast={credits?.cast}
        />
      </ContentWrapper>
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;

const Recommendation = ({ mediaType, id }) => {
  const { data, loading, error } = useFetch(
    `/${mediaType}/${id}/recommendations`
  );
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <div className="flex justify-between mb-3 px-2">
          <span className="carouselTitle">Recommended for you</span>
        </div>
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} />
    </div>
  );
};
