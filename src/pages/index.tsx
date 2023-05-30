import { useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { version } from "../../package.json";

import Logo from "../components/layout/Logo";
import Head from "next/head";
import Spinner from "@/components/Spinner";
import LogoProvider from "@/components/LogoProvider";

const Login = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [loading, setLoading] = useState(false);

  const onLogin = async (providerId: string) => {
    setLoading(true);
    await signIn(providerId, { redirect: false, callbackUrl: "/dashboard" });
  };

  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta
          name="description"
          content="Netflix Clone UI Developed by Michelle Perez"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="login_bg_gradient bg-cover h-screen grid place-items-center p-10">
        <Logo style="w-52 absolute top-0 left-0 m-8" />

        <div className="text-center p-10 sm:w-[400px] w-full  space-y-6 flex flex-col justify-center items-center bg-glass">
          <h2 className="text-3xl font-medium">Sign In</h2>

          {loading ? (
            <Spinner />
          ) : (
            <div>
              {Object.values(providers).map((provider) => (
                <button
                  key={provider.id}
                  disabled={loading}
                  className="bg-white text-black flex gap-2 items-center p-4 text-xl w-full rounded-md justify-center mb-5"
                  onClick={() => onLogin(provider.id)}
                >
                  <LogoProvider providerId={provider.id} />
                  <span className="sm:text-lg text-sm">{`Sign in with ${provider.name}`}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="absolute right-10 bottom-10 text-stone-500">
          version: {version}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  if (session) {
    return { redirect: { destination: "/dashboard" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}

export default Login;
