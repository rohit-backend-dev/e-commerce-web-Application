// // src/components/StarRating.jsx
// import React from 'react';
// import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

// const StarRating = ({ rating }) => {
//   const stars = [];

//   for (let i = 1; i <= 5; i++) {
//     if (rating >= i) {
//       stars.push(<FaStar key={i} className="text-green-500" />); // changed yellow to indigo
//     } else if (rating >= i - 0.5) {
//       stars.push(<FaStarHalfAlt key={i} className="text-green-500" />);
//     } else {
//       stars.push(<FaRegStar key={i} className="text-green-500" />);
//     }
//   }

//   return <div className="flex gap-1 mt-1">{stars}</div>;
// };

// export default StarRating;
import React from 'react'

const StarRating = () => {
  return (
    <div></div>
  )
}

export default StarRating