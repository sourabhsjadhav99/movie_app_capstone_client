import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./style.scss";

const Rating = ({ rating }) => {
    const fullStars = Math.floor(rating)/2;
    const hasHalfStar = rating - fullStars >= 0.5;
  
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i}>&#9733;</span>); // Full star
    }
    if (hasHalfStar) {
      stars.push(<span key="half" style={{ opacity: 0.5 }}>&#9733;</span>); // Half star
    }
    while (stars.length < 5) {
      stars.push(<span key={stars.length}>&#9734;</span>); // Empty star
    }
  
    return <div className={`${rating < 5 ? "bg-red-400" : rating < 7 ? "bg-orange-400" : "bg-green-400"} rounded-lg border p-2`}>{stars}</div>;
  };
  

export default Rating;
