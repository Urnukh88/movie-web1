"use client";

import { searchMovies } from "@/src/utils/tmdbApi";
import useSWR from "swr";
import { useState, KeyboardEvent, useEffect } from "react";
import { Loader, ArrowRight, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

interface SearchBarProps {
  isMobileOpen?: boolean;
  onClose?: () => void;
}

export const SearchBar = ({ isMobileOpen, onClose }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const shouldFetch = searchValue.trim().length >= 2;

  const { data, isLoading } = useSWR(
    shouldFetch ? ["search-movie", searchValue] : null,
    () => searchMovies(searchValue),
  );

  useEffect(() => {
    setSearchValue("");
  }, [pathname]);

  const handleSearchRedirect = () => {
    if (searchValue.trim()) {
      router.push(`/search/${encodeURIComponent(searchValue.trim())}`);
      setSearchValue("");
      if (onClose) onClose();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchRedirect();
    }
  };

  return (
    <div
      className={`relative w-full ${isMobileOpen ? "max-sm:flex-1" : "max-w-87.5"}`}
    >
      <div
        className={`flex items-center w-full h-9 bg-white px-3 gap-2 border border-gray-300 rounded-lg
        ${isMobileOpen ? "max-sm:border-none" : ""}`}
      >
        <Search className="text-gray-400 shrink-0" width={16} height={16} />

        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus={isMobileOpen}
          placeholder="Search ..."
          className="flex-1 text-[14px] outline-none placeholder:text-gray-400"
        />

        {isLoading && (
          <Loader size={14} className="animate-spin text-gray-400" />
        )}

        {isMobileOpen && (
          <button onClick={onClose} className="hidden max-sm:block p-1">
            <X className="text-black" size={14} />
          </button>
        )}
      </div>

      {shouldFetch && data?.results?.length > 0 && (
        <div
          className={`absolute top-11 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden
          ${isMobileOpen ? "max-sm:fixed max-sm:inset-x-4 max-sm:top-[70px] max-sm:w-auto" : "w-125 -left-18.75 md:left-0"}`}
        >
          <div className="max-h-105 overflow-y-auto">
            {data.results.slice(0, 6).map((movie: any) => (
              <Link
                key={movie.id}
                href={`/movie/${movie.id}`}
                onClick={() => {
                  setSearchValue("");
                  if (onClose) onClose();
                }}
                className="flex items-center gap-3 p-3 hover:bg-[#f4f4f5] transition-colors border-b border-gray-100 last:border-0"
              >
                <div className="relative w-16.75 h-25 shrink-0 rounded overflow-hidden bg-gray-100">
                  <Image
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                        : "/no-poster.png"
                    }
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-[#09090b] ">
                    {movie.title}
                  </h4>
                  <div className="flex items-center  mt-0.5">
                    <span className="text-yellow-500 text-[16px]">★</span>
                    <span className="text-[14px] ml-1 font-medium">
                      {movie.vote_average?.toFixed(1)}
                    </span>
                    <span className="font-normal text-gray-400 text-[12px]">
                      /10
                    </span>
                  </div>
                  <div className="text-[#09090b] text-[14px] mt-5 font-medium">
                    {movie.release_date}
                  </div>
                </div>

                <div className="flex mt-18 items-center gap-1 text-[12px] font-medium text-gray-900 shrink-0">
                  See more <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
          <button
            onClick={handleSearchRedirect}
            className="w-full p-4 text-[14px] flex font-medium hover:bg-gray-50 border-t border-gray-100 transition-all"
          >
            See all results for "{searchValue}"
          </button>
        </div>
      )}
    </div>
  );
};
