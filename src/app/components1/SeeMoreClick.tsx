export type Movie = {
  title: string;
  poster_path: string;
  vote_average: number;
  id: number;
};

export const getMovieFromDB = async (category: string) => {
  const responsePopular = await fetch(
    `https://api.themoviedb.org/3/movie/${category}?language=en&page=1`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}`,
      },
    }
  );

  const popularMovies = await responsePopular.json();

  const movieResults = popularMovies.results;

  return { movieResults };
};
