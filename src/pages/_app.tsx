import '@/styles/globals.css';
import { EStatus } from '@/utils/constant';
import { SessionProvider, useSession } from 'next-auth/react';
import { Suspense } from 'react';

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
        <Suspense fallback={<div>Loading</div>}>
          <Component {...pageProps} />
        </Suspense>
      )}
    </SessionProvider>
  );
}

function Auth({ children }: any) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === EStatus.loading) {
    return (
      <div className='w-screen h-screen flex justify-center items-center text-3xl'>
        <h1>Loading...</h1>
      </div>
    );
  }

  return children;
}
