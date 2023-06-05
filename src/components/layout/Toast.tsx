import { RiCloseLine } from "react-icons/ri";
import useToast from "@/hooks/useToast";

const Toast = () => {
  const { show, title, closeToast } = useToast();

  if (show) {
    return (
      <div className="w-[200px] min-h-[70px] rounded bg-stone-500 flex justify-between gap-0 items-center fixed right-5 bottom-5 z-30 transition">
        <div className="w-2/3 text-center">{title}</div>
        <button
          onClick={closeToast}
          className="flex justify-center w-1/3 text-3xl p-3"
        >
          <RiCloseLine />
        </button>
      </div>
    );
  }

  return null;
};

export default Toast;
