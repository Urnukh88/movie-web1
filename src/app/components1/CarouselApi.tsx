export async function movieApi() {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}`,
      },
      cache: "no-store",
    }
  );

  const data = await response.json();
  return data.results;
}

export async function getMovieTrailer(id: number) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_READ_TOKEN}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  const data = await res.json();

  const trailer =
    data.results?.find(
      (v: any) => v.type === "Trailer" && v.site === "YouTube"
    ) || data.results?.find((v: any) => v.site === "Youtube");

  return trailer?.key ?? null;
}
