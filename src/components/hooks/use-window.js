// (c) Hussein Kamal
// Created in 2022

import { useLayoutEffect, useState } from "react";

const useWindow = () => {
  const [currentWidth, setCurrentWidth] = useState(0);

  useLayoutEffect(() => {
    const updatecurrentWidth = () => {
      setCurrentWidth(window.innerWidth);
    };
    window.addEventListener("resize", updatecurrentWidth);

    return () => window.removeEventListener("resize", updatecurrentWidth);
  }, [currentWidth]);

  return { currentWidth };
};

export default useWindow;
