import { UpComing } from "./UpComing";
import { Popular } from "./Popular";
import { TopRated } from "./TopRated";

export const MovieCard = () => {
  return (
    <div className="max-w-[1440px]">
      <UpComing />
      <Popular />
      <TopRated />
    </div>
  );
};
