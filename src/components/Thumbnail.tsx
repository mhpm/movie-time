import Image from 'next/image';
import React from 'react';

const Thumbnail = ({ movie, handleClick }: any) => {
  return (
    <button
      onClick={handleClick}
      className={`relative min-w-[180px] cursor-pointer transition duration-200 ease-out h-[400px] md:h-[400px] md:min-w-[260px] md:hover:scale-105`}>
      <Image
        priority
        sizes='100'
        src={`https://image.tmdb.org/t/p/w500${
          movie.poster_path || movie.poster_path
        }`}
        className='rounded-sm object-cover md:rounded'
        fill
        alt='movie poster'
      />
    </button>
  );
};

export default Thumbnail;
