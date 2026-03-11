import { SeeMoreButton } from "@/src/components/SeeMoreButton";
import { Movie, getMovieFromDB } from "./SeeMoreClick";
import Link from "next/link";

export const Popular = async () => {
  const { movieResults }: { movieResults: Movie[] } =
    await getMovieFromDB("popular");
  return (
    <div className="w-full px-4 lg:px-20 pt-[52px] pb-[52px]">
      <div className="flex justify-between pb-8">
        <p className="font-bold text-2xl">Popular</p>
        <Link href="/category/popular">
          <SeeMoreButton />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-4 sm:gap-8">
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
