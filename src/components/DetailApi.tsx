// import { TMDB_BASE_URL } from "@/app/movie/[id]/page";

// export async function fetchMovieDetail(movieId: string) {
//   const res = await fetch(`${TMDB_BASE_URL}/movie/${movieId}?language=en-US`, {
//     headers: {
//       Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}`,
//     },
//     cache: "no-store",
//   });

//   const movieDetail = res.json();
//   return movieDetail;
// }

// export async function fetchMovieTrailer(movieId: string) {
//   const res = await fetch(
//     `${TMDB_BASE_URL}/movie/${movieId}/videos?language=en-US`,
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}`,
//       },
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) return null;

//   const data = await res.json();

//   return data.results.find(
//     (v: any) => v.site === "YouTube" && v.type === "Trailer"
//   );
// }
