"use client";

import { useState } from "react";
import { getMovieTrailer } from "../app/components1/CarouselApi";

export function TrailerButton({ movieId }: { movieId: number }) {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const key = await getMovieTrailer(movieId);
    setTrailerKey(key);
    setOpen(true);
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="absolute bottom-4 left-4 bg-white text-black px-4 py-2 rounded-md font-semibold shadow-md hover:bg-gray-200 transition"
      >
        {loading ? "Loading..." : "▶ Watch Trailer"}
      </button>

      {open && trailerKey && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="relative w-[80%] max-w-3xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-0 text-white text-3xl"
            >
              x
            </button>
            <iframe
              className="w-full aspect-video rounded-lg"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              allowFullScreen
            />
          </div>
        </div>
      )}

      {open && !trailerKey && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center text-white text-lg">
          Trailer not available
        </div>
      )}
    </>
  );
}
