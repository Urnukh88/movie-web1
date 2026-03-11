// import { Movie, getMovieFromDB } from "../../components1/SeeMoreClick";
// import Link from "next/link";
// import { DynamicPagination } from "../../about/components/DynamicPagination";

// export default async function Page({
//   params,
// }: {
//   params: Promise<{ movieCategory: string }>;
// }) {
//   const { movieCategory } = await params;

//   const { movieResults }: { movieResults: Movie[] } =
//     await getMovieFromDB(movieCategory);

//   return (
//     <div className="max-w-[1440px] mx-auto px-4 sm:px-10 pt-12">
//       <div className="pb-[36px]">
//         <p className="flex justify-start font-bold text-[24px] text-center">
//           {movieCategory}
//         </p>
//       </div>
//       <div className="flex flex-wrap justify-center gap-8 pb-[51px]">
//         {movieResults.slice(0, 20).map((info) => (
//           <Link key={info.id} href={`/movie/${info.id}`}>
//             <div key={info.id} className="bg-[#F4F4F5] rounded-lg">
//               <img
//                 className="h-[340px] w-[229.73px] rounded-lg object-cover"
//                 src={`https://image.tmdb.org/t/p/w500${info.poster_path}`}
//                 alt={info.title}
//               />

//               <p className="flex items-center gap-1 pt-2 pl-2 text-sm">
//                 <img className="h-4 w-4" src="/star.png" alt="" />
//                 {info.vote_average.toFixed(1)}
//                 <span className="text-gray-500">/10</span>
//               </p>

//               <div className="w-[213.73px] pt-2 pl-2 pb-3">
//                 <p className="line-clamp-2">{info.title}</p>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>

//       <div className="flex justify-end pb-8 w-full">
//         <div className="inline-flex">
//           <DynamicPagination totalPage={Math.ceil(movieResults.length / 20)} />
//         </div>
//       </div>
//     </div>
//   );
// }
import { Movie, getMovieFromDB } from "../../components1/SeeMoreClick";
import Link from "next/link";
import { DynamicPagination } from "../../about/components/DynamicPagination";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ movieCategory: string }>;
  searchParams?: Promise<{ page?: string }>;
}) {
  const { movieCategory } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const currentPage = Number(resolvedSearchParams?.page) || 1;

  const {
    movieResults,
    total_pages,
  }: { movieResults: Movie[]; total_pages: number } = await getMovieFromDB(
    movieCategory,
    currentPage,
  );

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-10 pt-12">
      <div className="pb-[36px]">
        <p className="flex justify-start font-bold text-[24px] text-center capitalize">
          {movieCategory}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-4 sm:gap-8 pb-[51px]">
        {movieResults.map((info) => (
          <Link key={info.id} href={`/movie/${info.id}`}>
            <div className="bg-[#F4F4F5] rounded-lg">
              <img
                className="h-[340px] w-[229.73px] rounded-lg object-cover"
                src={`https://image.tmdb.org/t/p/w500${info.poster_path}`}
                alt={info.title}
              />

              <p className="flex items-center gap-1 pt-2 pl-2 text-sm">
                <img className="h-4 w-4" src="/star.png" alt="" />
                {info.vote_average.toFixed(1)}
                <span className="text-gray-500">/10</span>
              </p>

              <div className="w-[213.73px] pt-2 pl-2 pb-3">
                <p className="line-clamp-2">{info.title}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-end pb-8 w-full">
        <div className="inline-flex">
          <DynamicPagination
            totalPage={total_pages > 500 ? 500 : total_pages || 1}
          />
        </div>
      </div>
    </div>
  );
}
