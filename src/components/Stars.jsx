import React, { useState } from "react";

const StarRating = ({ initialRating, maxRating, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleClick = async (newRating) => {

    if (onRatingChange) {
      let res = await onRatingChange(newRating);
      if(res.status === 'ok'){
        setRating(res.data.votesAvg);
      }

    }
  };

  const stars = [];
  for (let i = 1; i <= maxRating; i += 1) {
    const starClassName = i <= rating ? "text-yellow-500" : "text-gray-300";
    stars.push(
      <span
        key={i}
        className={`cursor-pointer text-2xl self-center hover:text-yellow-300 ${starClassName}`}
        onClick={() => handleClick(i)}
      >
        &#9733;
      </span>
    );
  }

  return <div className="flex space-x-1">{stars}</div>;
};

export default StarRating;
