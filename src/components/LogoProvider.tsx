import { createElement } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

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
  return createElement(IconProviders[providerId], {
    className,
  });
};

export default LogoProvider;
