import React from 'react';
import useMovies from '../hooks/useMovies';
import MovieList from '../components/MovieList/MovieList';

const HomePage = () => {
  const { movies, loading, error } = useMovies();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading movies: {error.message}</p>;

  return (
    <div>
      <h1>Movie List</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
