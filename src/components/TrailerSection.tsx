// "use client";

// import { useState } from "react";
// import { TMDB_IMAGE_URL } from "@/app/movie/[id]/page";

// export default function TrailerSection({
//   posterPath,
//   trailerKey,
// }: {
//   posterPath: string;
//   trailerKey?: string;
// }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <div className="relative w-[290px] mt-6">
//         <img src={`${TMDB_IMAGE_URL}${posterPath}`} className="rounded-lg" />

//         {trailerKey && (
//           <button
//             onClick={() => setOpen(true)}
//             className="absolute inset-0 bg-black/50 text-white
//             flex items-center justify-center font-bold
//             opacity-0 hover:opacity-100 transition"
//           >
//             ▶ Watch Trailer
//           </button>
//         )}
//       </div>

//       {open && (
//         <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
//           <div className="w-[800px] aspect-video relative">
//             <button
//               className="absolute -top-10 right-0 text-white"
//               onClick={() => setOpen(false)}
//             >
//               ✕ Close
//             </button>
//             <iframe
//               className="w-full h-full"
//               src={`https://www.youtube.com/embed/${trailerKey}`}
//               allowFullScreen
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
