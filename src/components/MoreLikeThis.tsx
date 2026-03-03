import Link from "next/link";
import { SeeMoreButton } from "./SeeMoreButton";

export default function MoreLikeThis({ movieId }: { movieId: string }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-[20px] font-bold">More like this</h2>
      <Link href={`/movie/${movieId}/similar`}>
        <SeeMoreButton />
      </Link>
    </div>
  );
}
