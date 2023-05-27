import { useEffect, useState } from "react";
import Logo from "../components/layout/Logo";
import { FcGoogle } from "react-icons/fc";
import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { fetchMyQuery } from "@/lib/hasura";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { FaGithub } from "react-icons/fa";
import React from "react";
import { version } from "../../package.json";

import Image from "next/image";
import spinn from "../../public/static/spinner.svg";

const Login = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRouteComplete = () => setLoading(false);

  const handleRouteStart = () => setLoading(true);

  useEffect(() => {
    fetchMyQuery()
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteComplete);
    router.events.on("routeChangeStart", handleRouteStart);

    return () => {
      router.events.off("routeChangeComplete", handleRouteComplete);
      router.events.off("routeChangeStart", handleRouteStart);
    };
  }, [router]);

  const onLogin = async (providerId: string) => {
    setLoading(true);
    await signIn(providerId, { redirect: false, callbackUrl: "/dashboard" });
  };

  return (
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
  );
};

const Spinner = () => (
  <Image
    src={spinn}
    width={35}
    height={35}
    alt="spinner"
    className="motion-safe:animate-spin text-white"
  />
);

const IconProviders: any = {
  google: FcGoogle,
  github: FaGithub,
};

const LogoProvider = ({
  providerId,
  className = "text-3xl rounded-full",
}: {
  providerId: string;
  className?: string;
}) => {
  return React.createElement(IconProviders[providerId], {
    className,
  });
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/dashboard" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}

export default Login;
