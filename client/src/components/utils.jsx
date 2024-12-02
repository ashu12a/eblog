import React from "react";
import { Link } from "react-router-dom";

export function Heading({className = "", text, white=false }) {
  return (
    <Link to='/post-detail/Cloud journeys' className={`font-semibold ${white ? 'heading-white' : 'heading-black'} ${className}`}>
      <span className={white ? 'heading-white-span' : 'heading-black-span'}>
        {text}
      </span>
    </Link>
  );
}



