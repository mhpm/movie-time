import React, { useRef } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

import Thumbnail from "@/components/Thumbnail";
import { useAppDispatch } from "@/redux/hooks";
import { setVideo } from "@/redux/features/movieSlice";

const Row = ({ title, movies }: any) => {
  const rowRef: any = useRef(null);
  const dispatch = useAppDispatch();

  const handleClick = (direction: any) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-0.5 md:space-y-2">
      <h2 className="w-56 mt-6 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>

      <div className="group relative md:ml-2 overflow-y-hidden">
        <BiChevronLeft
          className="absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick("left")}
        />

        <div
          className="flex items-center space-x-0.5 scrollbar-hide overflow-x-scroll md:space-x-2.5 md:p-2 overflow-y-hidden"
          ref={rowRef}
        >
          {movies &&
            movies.map((movie: any) => (
              <Thumbnail
                key={movie.id}
                movie={movie}
                handleClick={() => dispatch(setVideo(movie))}
              />
            ))}
        </div>

        <BiChevronRight
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export default Row;
