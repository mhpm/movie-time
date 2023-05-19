import { useEffect, useState } from 'react';
import Logo from '../components/Logo';
import { FcGoogle } from 'react-icons/fc';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { EStatus } from '@/utils/constant';

const Home = () => {
  const { status } = useSession();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleRouteChange = () => {
    setLoading(false);
    console.log('routeChangeComplete');
  };

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    if (status === EStatus.authenticated) {
      router.push('/dashboard');
    }
  }, [status]);

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  const onLogin = async () => {
    setLoading(true);
    await signIn('google', { redirect: true, callbackUrl: '/dashboard' });
  };

  return (
    <div className='login_bg_gradient bg-cover h-screen grid place-items-center'>
      <Logo style='w-52 absolute top-0 left-0 m-8' />

      <div className='text-center bg-[rgba(0,0,0,0.75)] p-10 w-80 space-y-6'>
        <h2 className='text-3xl font-medium'>Sign in</h2>

        <button
          className='bg-white text-black flex gap-2 items-center p-4 text-xl w-full rounded justify-center'
          onClick={onLogin}>
          <FcGoogle className='text-3xl rounded-full' />
          {loading ? 'Loading' : 'Google'}
        </button>
      </div>
    </div>
  );
};

export default Home;
