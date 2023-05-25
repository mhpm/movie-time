import { useEffect, useState } from "react";

export const useScroll = () => {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);

  const handleNavigation = () => {
    setPositionY(window.scrollY);
    setPositionX(window.scrollX);
  };

  useEffect(() => {
    handleNavigation();
    window.addEventListener("scroll", () => handleNavigation());

    return () => window.removeEventListener("scroll", () => handleNavigation());
  }, []);

  return { positionX, positionY };
};
