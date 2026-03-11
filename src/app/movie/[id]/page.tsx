import Link from "next/link";
import MoreLikeThis from "@/src/components/MoreLikeThis";
import { TrailerPlayer } from "../../components1/TrailerPlayer";
import { ArrowRight } from "lucide-react";
import { SeeMoreButton } from "@/src/components/SeeMoreButton";

type Genre = {
  id: number;
  name: string;
};
type MovieDetail = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average?: number;
  release_date: string;
  runtime: number;
  genres: Genre[];
  backdrop_path?: string;
  adult?: boolean;
};
type SimilarMovie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average?: number;
};
type Cast = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};
type Crew = {
  id: number;
  name: string;
  job: string;
};
type CreditsResponse = {
  cast: Cast[];
  crew: Crew[];
};
type Video = {
  key: string;
  site: string;
  type: string;
};
async function fetchFromTMDB(movieId: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    {
      headers: { Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}` },
      cache: "no-store",
    },
  );
  console.log(process.env.TMDB_READ_TOKEN);

  return res.json();
}
async function fetchMovieVideos(id: string): Promise<Video[]> {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}`,
      },
      cache: "no-store",
    },
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.results || [];
}
async function fetchMovieCreditsFull(id: string): Promise<CreditsResponse> {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}`,
      },
      cache: "no-store",
    },
  );
  if (!res.ok) return { cast: [], crew: [] };
  return res.json();
}
async function fetchSimilarMovies(id: string): Promise<SimilarMovie[]> {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}`,
      },
      cache: "no-store",
    },
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.results || [];
}

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie: MovieDetail = await fetchFromTMDB(id);
  const credits = await fetchMovieCreditsFull(id);
  const similarMovies = await fetchSimilarMovies(id);
  const videos = await fetchMovieVideos(id);
  const trailer = videos.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  );

  const directors =
    credits?.crew?.filter((c: any) => c.job === "Director") || [];
  const writers = credits.crew.filter(
    (person) =>
      person.job === "Writer" ||
      person.job === "Screenplay" ||
      person.job === "Story",
  );
  const stars = credits.cast.slice(0, 3);

  return (
    <div className="max-w-[1080px] mx-auto px-4 py-10 space-y-10 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-bold text-black">
            {movie.title}
          </h1>
          <p className="text-gray-600 text-sm md:text-lg">
            {movie.release_date} • {movie.adult ? "R" : "PG"} • {movie.runtime}{" "}
            min
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end mt-2 md:mt-0">
          <span className="text-xs md:text-sm text-gray-400 font-semibold max-sm:hidden">
            Rating
          </span>
          <div className="flex items-center gap-1 mt-1 md:mt-0">
            <span className="text-yellow-400 text-lg md:text-xl">⭐</span>
            <span className="text-lg md:text-xl font-semibold text-gray-900">
              {movie.vote_average?.toFixed(1) || "0.0"}{" "}
              <span className="text-gray-500 text-sm md:text-base">/10</span>
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 items-stretch">
        <div className="hidden md:block relative w-full aspect-[2/3] rounded-lg overflow-hidden border border-gray-100 shadow-lg">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="object-cover w-full h-full"
          />
        </div>

        <div className=" relative w-full aspect-video rounded-lg overflow-hidden bg-black shadow-lg order-first md:order-0">
          {trailer ? (
            <TrailerPlayer
              trailerKey={trailer?.key || ""}
              backdropPath={movie.backdrop_path || ""}
              title={movie.title}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Trailer
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 md:block pt-4">
        <div className="md:hidden relative w-[100px] h-[148px] rounded-lg overflow-hidden shadow">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap gap-2">
            {movie.genres?.map((g: any) => (
              <span
                key={g.id}
                className="text-xs md:text-sm font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-800"
              >
                {g.name}
              </span>
            ))}
          </div>

          <p className="text-gray-800 text-sm md:text-base leading-relaxed">
            {movie.overview}
          </p>
        </div>
      </div>
      <div className="pt-6 space-y-3 text-[16px]">
        {directors.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
            <span className="font-bold text-lg">Director:</span>
            <span className="text-gray-900 text-base sm:text-lg">
              {directors
                .map((d: any) => d?.name)
                .filter(Boolean)
                .join(", ")}
            </span>
          </div>
        )}

        {writers.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
            <span className="font-bold text-lg">Writers:</span>
            <span className="text-gray-900 text-base sm:text-lg">
              {writers
                .slice(0, 3)
                .map((w: any) => w?.name)
                .filter(Boolean)
                .join(", ")}
            </span>
          </div>
        )}

        {stars.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
            <span className="font-bold text-lg">Stars:</span>
            <span className="text-gray-900 text-base sm:text-lg">
              {stars
                .map((s: any) => s?.name)
                .filter(Boolean)
                .join(", ")}
            </span>
          </div>
        )}
      </div>

      <div className="pt-10 space-y-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">More like this</h2>
          <Link
            href={`/movie/${id}/similar`}
            className=" flex gap-2 text-sm md:text-base font-medium text-black"
          >
            See More <ArrowRight className="w-4 pt-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {similarMovies.slice(0, 5).map((m: any) => (
            <Link key={m.id} href={`/movie/${m.id}`}>
              <div className="bg-gray-100 rounded-lg overflow-hidden shadow hover:scale-105 transition flex flex-col">
                <div className="relative w-full aspect-[2/3]">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                    alt={m.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-2 text-sm md:text-base">
                  <span className="text-yellow-400 font-semibold">⭐</span>{" "}
                  {m.vote_average?.toFixed(1) || "0.0"}/10
                  <p className="truncate">{m.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
