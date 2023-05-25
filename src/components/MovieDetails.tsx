import React, { useState } from "react";
import Navbar from "./Navbar";
import { baseUrl } from "@/utils/constant";
import GradientBackground from "@/components/GradientBackground";
import { IoIosInformationCircle } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

import dynamic from "next/dynamic";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

const MovieDetails = ({ movie, trailerURL }: any) => {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <ParallaxProvider>
      <Navbar />
      <div className="container">
        <div className="flex flex-col space-y-2 py-16 md:space-y-4 h-screen justify-center lg:pb-12 px-16">
          <GradientBackground
            url={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
            className="absolute top-0 left-0 -z-10 h-screen w-screen bg-center"
          />

          <Parallax speed={-10}>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-7xl">
              {movie?.title || movie?.name || movie?.original_name}
            </h1>
            <p className=" md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
              {movie?.overview}
            </p>
            <div className="flex space-x-3 pt-10">
              <button
                className="bannerButton bg-white text-black"
                onClick={() => {
                  setShowPlayer(true);
                }}
              >
                <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
                Play
              </button>

              <button className="bannerButton bg-[gray]/70">
                <IoIosInformationCircle className="h-5 w-5 md:h-8 md:w-8" />
                More Info
              </button>
            </div>
          </Parallax>
        </div>
        <div
          className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ${
            showPlayer ? "opacity-100 z-50" : "opacity-0 -z-10"
          }`}
        >
          <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-3.5">
            <span className="font-semibold">Play Trailer</span>
            <div
              className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0F0F0F]"
              onClick={() => setShowPlayer(false)}
            >
              <AiOutlineClose className="h-5" />
            </div>
          </div>
          <div className="relative pt-[56.25%]">
            <ReactPlayer
              url={trailerURL}
              width="100%"
              height="100%"
              style={{ position: "absolute", top: "0", left: "0" }}
              controls={true}
              playing={showPlayer}
            />
          </div>
        </div>
      </div>
    </ParallaxProvider>
  );
};

export default MovieDetails;
