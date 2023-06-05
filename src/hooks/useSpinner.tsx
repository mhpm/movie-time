import Spinner from "@/components/Spinner";
import { useState } from "react";

function useSpinner() {
  const [loading, setLoading] = useState(false);

  return {
    loading,
    toggleSpinner: () => setLoading(!loading),
    Spinner,
  };
}

export default useSpinner;
