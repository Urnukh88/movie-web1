import { MovieCard } from "./components1/MovieCard";
import { PlayingCarousel } from "./components1/PlayingCarousel";
import { movieApi } from "./components1/CarouselApi";

export default async function Home() {
  const movies = await movieApi();
  return (
    <div className="flex items-center flex-col pt-[24px]">
      <PlayingCarousel movies={movies} />
      <MovieCard />
    </div>
  );
}
