// import Link from "next/link";
// import { getMoviesByGenre } from "@/src/utils/tmdbApi";
// import { getGenres } from "@/src/utils/tmdbApi";

// interface Movie {
//   id: number;
//   title: string;
//   poster_path: string;
//   vote_average: number;
// }

// interface TMDBResponse {
//   page: number;
//   results: Movie[];
//   total_pages: number;
//   total_results: number;
// }

// interface PageProps {
//   params: {
//     id: string;
//   };
// }

// const GenrePage = async ({ params }: PageProps) => {
//   const genreNameOrId = params.id;
//   const genres = await getGenres();

//   const genre = genres.find((g) => {
//     if (!genreNameOrId) return false;
//     return (
//       g.id.toString() === genreNameOrId ||
//       g.name.toLowerCase() === genreNameOrId.toLowerCase()
//     );
//   });

//   if (!genre) {
//     return <p className="text-center mt-10 text-red-500">Invalid genre</p>;
//   }

//   const data = await getMoviesByGenre(genre.id.toString());
//   const movies = data.results;

//   return (
//     <div className="max-w-[1440px] mx-auto px-4 py-10">
//       <h1 className="text-2xl font-bold mb-8">{genre.name} Movies</h1>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//         {movies.map((movie) => (
//           <Link key={movie.id} href={`/movie/${movie.id}`}>
//             <div className="bg-[#F4F4F5] rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition">
//               <img
//                 src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                 alt={movie.title}
//                 className="w-full aspect-[2/3] object-cover"
//               />
//               <div className="p-2">
//                 <p className="font-medium text-sm line-clamp-2">
//                   {movie.title}
//                 </p>
//                 <div className="flex items-center gap-1 text-xs mt-1">
//                   ⭐ {movie.vote_average.toFixed(1)}
//                   <span className="text-gray-500">/10</span>
//                 </div>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GenrePage;
"use client";

import { useEffect, useState } from "react";
import { getGenres, getMoviesByGenre } from "@/src/utils/tmdbApi";
import Link from "next/link";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { Star, ChevronRight } from "lucide-react";

export default function GenrePage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const [moviesData, setMoviesData] = useState<{
    results: any[];
    total_pages: number;
  }>({
    results: [],
    total_pages: 1,
  });
  const [allGenres, setAllGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    getGenres().then((data) => setAllGenres(data.genres || []));
    if (params.id && params.id !== "all") {
      setSelectedGenres(decodeURIComponent(params.id as string).split(","));
    } else {
      setSelectedGenres([]);
    }
  }, [params.id]);

  useEffect(() => {
    const genreString = selectedGenres.join(",");
    getMoviesByGenre(genreString, currentPage).then((data) => {
      setMoviesData({
        results: data.results || [],
        total_pages: data.total_pages || 1,
      });
    });
  }, [selectedGenres, currentPage]);

  const toggleGenre = (id: string) => {
    let newGenres;
    if (selectedGenres.includes(id)) {
      newGenres = selectedGenres.filter((g) => g !== id);
    } else {
      newGenres = [...selectedGenres, id];
    }
    if (newGenres.length > 0) {
      router.push(`/genre/${newGenres.join(",")}?page=1`);
    } else {
      router.push("/genre/all?page=1");
    }
  };

  return (
    <div className="max-w-[1316px] mx-auto px-4 py-10 gap-5 min-h-screen">
      <h3 className="text-[30px] font-bold text-black ">Search filter</h3>
      <div className="flex flex-col py-10 md:flex-row gap-10">
        {/* Genres Sidebar */}
        <div className="w-full md:w-[320px] shrink-0">
          <div className="mt-2">
            <h3 className="text-[18px] font-bold text-black mb-4 max-sm:hidden">
              Genres
            </h3>
            <p className="text-gray-500 text-[14px] mb-6 font-medium">
              See lists of movies by genre
            </p>
            <div className="flex flex-wrap gap-2">
              {allGenres.map((g: any) => {
                const isActive = selectedGenres.includes(String(g.id));
                return (
                  <button
                    key={g.id}
                    onClick={() => toggleGenre(String(g.id))}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full border text-[12px] font-semibold transition-colors
                      ${isActive ? "bg-black text-white border-black" : "bg-white text-black border-[#E4E4E7] hover:border-black"}`}
                  >
                    <span>{g.name}</span>
                    <ChevronRight
                      size={14}
                      className={isActive ? "text-white" : "text-gray-400"}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="hidden md:block w-px bg-[#E4E4E7] self-stretch" />

        {/* Movies Grid */}
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-[28px] font-bold text-black">
              {moviesData.results.length} titles found
            </h1>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {moviesData.results.map((m: any) => (
              <Link key={m.id} href={`/movie/${m.id}`} className="group">
                <div className="bg-[#f4f4f5] rounded-xl overflow-hidden h-full flex flex-col transition-all hover:shadow-lg">
                  <div className="relative aspect-[2/3] w-full">
                    <img
                      src={
                        m.poster_path
                          ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
                          : "/no-image.png"
                      }
                      alt={m.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-3 flex-1">
                    <div className="flex items-center mb-1 text-[14px]">
                      <Star
                        size={14}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      <span className="font-bold ml-1 text-black">
                        {m.vote_average?.toFixed(1)}
                      </span>
                      <span className="text-gray-500 text-[12px]">/10</span>
                    </div>
                    <p className="text-[14px] font-normal text-black">
                      {m.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
