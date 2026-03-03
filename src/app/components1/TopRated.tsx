import { SeeMoreButton } from "@/src/components/SeeMoreButton";
import Link from "next/link";
import { Movie, getMovieFromDB } from "./SeeMoreClick";

export const TopRated = async () => {
  const { movieResults }: { movieResults: Movie[] } =
    await getMovieFromDB("top_rated");

  return (
    <div className="w-full px-4 lg:px-20 pt-[52px] pb-[51px]">
      <div className="flex justify-between pb-6">
        <p className="font-bold text-2xl">Top Rated</p>
        <Link href="/category/top_rated">
          <SeeMoreButton />
        </Link>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {movieResults.slice(0, 10).map((info) => (
          <Link
            key={info.id}
            href={`/movie/${info.id}`}
            className="bg-[#F4F4F5] rounded-lg hover:scale-105 transition"
          >
            <img
              className="h-[340px] w-[229.73px] rounded-lg object-cover"
              src={`https://image.tmdb.org/t/p/w500${info.poster_path}`}
              alt={info.title}
            />

            <div className="flex items-center gap-1 pt-2 px-2 text-[14px] text-[#09090B]">
              <img className="h-4 w-4" src="/star.png" alt="" />
              {info.vote_average.toFixed(1)}
              <p className="text-[#71717A]">/10</p>
            </div>

            <div className="p-2">
              <p className="w-[213.73px] h-[95px] pt-[8px] pl-[8px]">
                {info.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
