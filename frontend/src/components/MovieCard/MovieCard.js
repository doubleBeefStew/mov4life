import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="card mb-4" style={{ cursor: 'pointer' }} onClick={handleClick}>
      <img
        src={movie.cover}
        alt={movie.title}
        className="card-img-top"
        style={{ height: '300px', objectFit: 'cover' }}
      />
      <div className="card-body">
        <h5 className="card-title">{movie.title}</h5>
        <p className="card-text text-muted">{movie.year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
