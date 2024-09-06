import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import styles from './MovieList.css'; // Ensure correct CSS module name

const MovieList = ({ movies = [] }) => {
  if (!Array.isArray(movies)) {
    console.error('Expected movies to be an array, but received:', movies);
    return <p>Unable to display movies. Please try again later.</p>;
  }

  return (
    <div className={styles.list}>
      {movies.length > 0 ? (
        movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      ) : (
        <p>No movies available</p>
      )}
    </div>
  );
};

export default MovieList;
