import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createToast, closeToast } from "@/redux/features/toastSlice";

interface IToast {
  title: string;
  desc?: string;
}

const useToast = () => {
  const { show, title, desc } = useAppSelector((state) => state.toastReducer);
  const dispatch = useAppDispatch();

  return {
    show,
    title,
    desc,
    createToast: ({ title, desc }: IToast) =>
      dispatch(createToast({ title, desc })),
    closeToast: () => dispatch(closeToast()),
  };
};

export default useToast;
