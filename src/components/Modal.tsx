import Image from 'next/image';
import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { FaPlay, FaStop } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

interface Props {
  children?: React.ReactNode;
}

const Modal = ({ movie, handleClose }: any) => {
  const [trailer, setTrailer] = useState('');
  const [showPlayer, setShowPlayer] = useState(false);
  const [data, setData] = useState<any>({});

  const getTrailer = () => {
    const trailerIndex = data?.videos?.results.findIndex(
      (element: any) => element.type === 'Trailer'
    );
    const trailerURL = `https://www.youtube.com/watch?v=${data.videos?.results[trailerIndex]?.key}`;
    setTrailer(trailerURL);
    setShowPlayer(true);
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
        className='absolute top-3 right-3 text-4xl text-stone-900'>
        <AiFillCloseCircle />
      </button>
      {showPlayer && (
        <ReactPlayer
          url={trailer}
          width='100%'
          height='500px'
          controls={true}
          playing={true}
        />
      )}
      {!showPlayer && (
        <Image
          priority
          width={800}
          height={500}
          src={`https://image.tmdb.org/t/p/w500${
            movie.backdrop_path || movie.poster_path
          }`}
          className='rounded-sm object-cover w-full'
          alt='movie poster'
        />
      )}
      <div className='flex space-x-3 p-10'>
        {!showPlayer ? (
          <button
            className='bannerButton bg-white text-black'
            onClick={getTrailer}>
            <FaPlay className='h-4 w-4 text-black md:h-7 md:w-7' />
            Play
          </button>
        ) : (
          <button
            className='bannerButton bg-white text-black'
            onClick={() => setShowPlayer(false)}>
            <FaStop className='h-4 w-4 text-black md:h-7 md:w-7' />
            Stop
          </button>
        )}
      </div>

      <Title>{movie?.title}</Title>
      <Body>{movie?.overview}</Body>
    </Container>
  );
};

const Container = ({ children }: Props) => {
  return (
    <div className='fixed z-50 w-screen h-screen top-0 left-0 flex justify-center items-center bg-black/50 backdrop-blur-sm'>
      <div className='sm:w-1/2 w-[90%] bg-black rounded overflow-auto sm:h-[800px] h-[90%] relative'>
        {children}
      </div>
    </div>
  );
};

const Title = ({ children }: Props) => {
  return <h1 className='text-3xl mb-2 pl-10'> {children}</h1>;
};

const Body = ({ children }: Props) => {
  return <div className='p-10 h-full'> {children}</div>;
};

export default Modal;
