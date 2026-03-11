export type Movie = {
  title: string;
  poster_path: string;
  vote_average: number;
  id: number;
};

export const getMovieFromDB = async (
  movieCategory: string,
  page: number = 1,
) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieCategory}?language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}`,
      },
      cache: "no-store",
    },
  );

  const data = await res.json();

  return {
    movieResults: data.results || [],
    total_pages: data.total_pages || 1,
  };
};
