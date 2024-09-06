export const fetchMovies = async () => {
  try {
    const response = await fetch('https://musical-space-cod-6v6r679wxr925vw5-3001.app.github.dev/api/v1/movie');
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    const data = await response.json();
    return data.data.movies;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error; // Make sure to throw the error to be caught in useMovies
  }
};
