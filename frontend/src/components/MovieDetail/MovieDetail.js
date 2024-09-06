// MovieDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const { id } = useParams(); // Get the movie ID from the URL parameters


  return (
    <div>
      <h1>Movie Detail for ID: {id}</h1>
      {/* Add more details about the movie here */}
    </div>
  );
};

export default MovieDetail;
