"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { getMovieTrailer } from "./CarouselApi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

type Movie = {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
};

export function PlayingCarousel({ movies }: { movies: Movie[] }) {
  const autoplay = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  const [trailerKey, setTrailerKey] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleTrailer = async (movieId: number) => {
    const key = await getMovieTrailer(movieId);
    setTrailerKey(key);
    setOpen(true);
  };

  return (
    <>
      <Carousel
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        opts={{ loop: true }}
        className="w-full h-[600px] max-sm:h-[532px]"
      >
        <CarouselContent>
          {movies && movies.length > 0 ? (
            movies.map((movie) => (
              <CarouselItem key={movie.id}>
                <div className="relative w-full h-[600px] max-sm:h-auto max-sm:flex max-sm:flex-col max-sm:items-start">
                  <img
                    src={
                      movie.backdrop_path
                        ? `${IMAGE_BASE}${movie.backdrop_path}`
                        : "/placeholder.png"
                    }
                    alt={movie.title || "No title"}
                    className="w-full h-full object-cover max-sm:h-[246px] max-sm:w-full"
                  />
                  <div className="absolute bottom-24 left-36 text-white flex flex-col h-[264px] mb-20 max-sm:relative max-sm:w-full max-sm:px-4 max-sm:mt-2 max-sm:text-black max-sm:left-1 max-sm:right-1">
                    <div className="max-sm:flex justify-between max-sm:pt-[100px]">
                      <div className="max-sm:pb-[16px]">
                        <p className="text-[16px] font-normal max-sm:text-[14px]">
                          Now Playing:
                        </p>
                        <h1 className="text-[36px] font-bold w-[410px] max-sm:w-full max-sm:text-[24px]">
                          {movie.title}
                        </h1>
                      </div>
                      <div className="flex text-[18px] mb-4 max-sm:text-[16px]">
                        ⭐
                        {movie.vote_average
                          ? movie.vote_average.toFixed(1)
                          : "N/A"}
                        <p className="text-[#71717A] text-[16px] max-sm:text-[14px]">
                          /10
                        </p>
                      </div>
                    </div>
                    <p className="text-[12px] w-[452px] pb-[16px] max-sm:w-full max-sm:text-[12px] max-sm:w-[335px] max-sm:text-[14px]">
                      {movie.overview}
                    </p>
                    <button
                      onClick={() => handleTrailer(movie.id)}
                      className="w-[145px] bg-white text-black flex items-center justify-center gap-[11.33px] font-medium rounded-md py-[5px] cursor-pointer max-sm:border max-sm:bg-black max-sm:text-[white]"
                    >
                      ▶ Watch Trailer
                    </button>
                  </div>
                </div>
              </CarouselItem>
            ))
          ) : (
            <p className="text-white text-center w-full">
              No movies available.
            </p>
          )}
        </CarouselContent>

        <CarouselPrevious className="ml-[80px] max-sm:hidden" />
        <CarouselNext className="mr-[80px] max-sm:hidden" />
      </Carousel>
      {open && trailerKey && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="relative w-[80%] max-w-4xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-0 text-white text-xl"
            >
              <p className="text-[30px]">x</p>
            </button>
            <iframe
              className="w-full aspect-video rounded-lg"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
