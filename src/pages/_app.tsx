import '@/styles/globals.css';
import { EStatus } from '@/utils/constant';
import { SessionProvider, useSession } from 'next-auth/react';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: any) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

function Auth({ children }: any) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === EStatus.loading) {
    return (
      <div className='w-screen h-screen flex justify-end items-center text-black'>
        <h1>Loading...</h1>
      </div>
    );
  }

  return children;
}
