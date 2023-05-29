import Image from "next/image";
import spinn from "../../public/static/spinner.svg";

type Props = {};

function Spinner({}: Props) {
  return (
    <Image
      src={spinn}
      width={35}
      height={35}
      alt="spinner"
      className="motion-safe:animate-spin text-white"
    />
  );
}

export default Spinner;
