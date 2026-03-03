export const getMoviesByGenre = async (genreId: string, page: number = 1) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${genreId}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_READ_TOKEN}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    console.error(await res.text());
    throw new Error("Failed to fetch movies by genre");
  }

  return res.json();
};

export type Genre = {
  id: number;
  name: string;
};

export type GenresResponse = {
  genres: Genre[];
};

export async function getGenres(): Promise<GenresResponse> {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_READ_TOKEN}`,
      },
      cache: "force-cache",
    },
  );

  if (!res.ok) {
    console.error(await res.text());
    throw new Error("Failed to fetch genres");
  }

  const data: GenresResponse = await res.json();
  return data;
}

export async function searchMovies(query: string) {
  if (!query) return { results: [] };

  const TMDB_BASE_URL = "https://api.themoviedb.org/3";

  if (!process.env.NEXT_PUBLIC_TMDB_READ_TOKEN) {
    throw new Error("TMDB API token is missing! Check your .env.local");
  }

  const res = await fetch(
    `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_READ_TOKEN}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("TMDB API Error:", text);
    throw new Error("Failed to fetch movies");
  }

  return res.json();
}
export async function getSimilarMovies(id: string, page: number) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) return { results: [], total_pages: 1 };

  const data = await res.json();
  return {
    results: data.results,
    total_pages: data.total_pages,
  };
}

export async function getMovieDetail(movieId: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
      cache: "force-cache",
    },
  );

  return res.json();
}
