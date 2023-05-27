import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import { FaPlay, FaStop } from "react-icons/fa";
import { IoIosCloseCircle, IoIosClose } from "react-icons/io";
import GradientBackground from "@/components/GradientBackground";
import RankBadge from "@/components/RankBadge";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

interface Props {
  children?: React.ReactNode;
}

const Modal = ({ movie, handleClose }: any) => {
  const [trailer, setTrailer] = useState("");
  const [showPlayer, setShowPlayer] = useState(false);
  const [data, setData] = useState<any>({});

  const getTrailer = () => {
    const trailerIndex = data?.videos?.results.findIndex(
      (element: any) => element.type === "Trailer"
    );
    const trailerURL = `https://www.youtube.com/watch?v=${data.videos?.results[trailerIndex]?.key}`;
    setTrailer(trailerURL);
    setShowPlayer(true);
  };

  const togglePlayer = () => {
    setShowPlayer(!showPlayer);
  };

  useEffect(() => {
    const getMovie = async () => {
      const request = await fetch(
        `https://api.themoviedb.org/3/movie/${movie?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`
      )
        .then((response) => response.json())
        .then((data) => setData(data));
    };

    getMovie();
  }, []);

  return (
    <Container>
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 text-5xl text-primary"
      >
        <IoIosClose className="text-white absolute right-0" />
        <IoIosCloseCircle className="absolute right-0" />
      </button>
      {showPlayer ? (
        <ReactPlayer
          url={trailer}
          width="100%"
          height="500px"
          controls={true}
          playing={true}
        />
      ) : (
        <GradientBackground
          url={`https://image.tmdb.org/t/p/w500${
            data?.poster_path || movie?.poster_path
          }`}
          className="rounded-sm w-full h-[60vh] bg-center"
        />
      )}

      <div className="flex space-x-3 p-10 justify-between">
        <ButtonPlayer
          showPlayer={showPlayer}
          getTrailer={getTrailer}
          togglePlayer={togglePlayer}
        />
        <div>
          <span className="text-2xl font-bold mr-3">Rank:</span>
          <RankBadge rank={+movie?.vote_average} />
        </div>
      </div>
      <div className="flex justify-end px-10 text-sm">
        <span className="text-gray-500 pr-1"> Release Date: </span>
        {movie?.release_date}
      </div>

      <Title>{movie?.title}</Title>
      <Body>{movie?.overview}</Body>
    </Container>
  );
};

const Container = ({ children }: Props) => {
  return (
    <div className="fixed z-50 w-screen h-screen top-0 left-0 flex justify-center items-center bg-black/50 backdrop-blur-sm">
      <div className="no-scrollbar sm:w-2/3 lg:w-1/2 w-[90%] bg-[#141414] rounded overflow-auto sm:h-fit h-[90vh] relative pb-10 rounded-xl">
        {children}
      </div>
    </div>
  );
};

const Title = ({ children }: Props) => {
  return <h1 className="text-3xl font-bold mb-2 pl-10"> {children}</h1>;
};

const ButtonPlayer = ({
  showPlayer,
  getTrailer,
  togglePlayer,
}: {
  showPlayer: boolean;
  getTrailer: () => void;
  togglePlayer: () => void;
}) => (
  <button
    className="bannerButton bg-white text-black"
    onClick={!showPlayer ? getTrailer : togglePlayer}
  >
    <span className="flex">
      {!showPlayer ? (
        <>
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7 mr-2" />
          Play
        </>
      ) : (
        <>
          <FaStop className="h-4 w-4 text-black md:h-7 md:w-7 mr-2" />
          Stop
        </>
      )}
    </span>
  </button>
);

const Body = ({ children }: Props) => {
  return <div className="px-10 h-fit"> {children}</div>;
};

export default Modal;
