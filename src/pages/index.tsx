import { useEffect, useState } from "react";
import Logo from "../components/layout/Logo";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { EStatus } from "@/utils/constant";
import { fetchMyQuery } from "@/lib/hasura";

const Home = () => {
  const router = useRouter();
  const { status } = useSession();
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
    if (status === EStatus.authenticated) {
      router.replace("/dashboard");
    }
  }, [status]);

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteComplete);
    router.events.on("routeChangeStart", handleRouteStart);

    return () => {
      router.events.off("routeChangeComplete", handleRouteComplete);
      router.events.off("routeChangeStart", handleRouteStart);
    };
  }, [router]);

  const onLogin = async () => {
    setLoading(true);
    await signIn("google", { redirect: false, callbackUrl: "/dashboard" });
  };

  return (
    <div className="login_bg_gradient bg-cover h-screen grid place-items-center p-10">
      <Logo style="w-52 absolute top-0 left-0 m-8" />

      <div className="text-center bg-[rgba(0,0,0,0.75)] p-10 sm:w-[400px] w-full  space-y-6 flex flex-col justify-center items-center">
        <h2 className="text-3xl font-medium">Sign in</h2>

        <button
          disabled={loading}
          className="bg-white text-black flex gap-2 items-center p-4 text-xl w-full rounded justify-center"
          onClick={onLogin}
        >
          <FcGoogle className="text-3xl rounded-full" />
          {loading ? "Loading" : "Sign in with Google"}
        </button>
      </div>
    </div>
  );
};

export default Home;
