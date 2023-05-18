import Login from '@/components/Login';
import MovieDetails from '@/components/MovieDetails';
import { getSession, useSession } from 'next-auth/react';

const MovieDetailPage = ({ movie }: any) => {
  const { data: session } = useSession();

  if (!session) return <Login />;

  const trailerIndex = movie.videos.results.findIndex(
    (element: any) => element.type === 'Trailer'
  );

  const trailerURL = `https://www.youtube.com/watch?v=${movie.videos?.results[trailerIndex]?.key}`;

  return (
    <div>
      <MovieDetails movie={movie} trailerURL={trailerURL} />
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const { id } = context.query;

  const request = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`
  ).then((response) => response.json());

  return {
    props: {
      session,
      movie: request,
    },
  };
}

MovieDetailPage.auth = true;

export default MovieDetailPage;
