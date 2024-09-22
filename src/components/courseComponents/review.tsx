import React from 'react';
import Rating from './ratings';
import UserReview from './userReview';


const Reviews: React.FC = (props) => {

  const totalRatings = 1200;
  const averageRating = 4.8;
  const ratings = [
    { stars: 5, count: 900, percentage: (900 / totalRatings) * 100 },
    { stars: 4, count: 200, percentage: (600 / totalRatings) * 100 },
    { stars: 3, count: 50, percentage: (400 / totalRatings) * 100 },
    { stars: 2, count: 30, percentage: (300 / totalRatings) * 100 },
    { stars: 1, count: 20, percentage: (250 / totalRatings) * 100 },
  ];

  return (
    <div className='w-[80%] h-[882px] bg-white p-10 mt-6 font-neue-haas'>
      <div>
        <Rating totalRating={totalRatings} averageRating={averageRating} ratings={ratings}/>
      </div>
      <div>
        <UserReview />
      </div>
    </div>
  )
}

export default Reviews;