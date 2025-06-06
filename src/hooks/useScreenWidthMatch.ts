import { useEffect, useState } from "react";

const useScreenWidthMatch = (maxWidth: number): boolean => {
  const [isMatch, setIsMatch] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth <= maxWidth : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMatch(window.innerWidth <= maxWidth);
    };

    window.addEventListener("resize", handleResize);

    // Run once on mount
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [maxWidth]);

  return isMatch;
};

export default useScreenWidthMatch;
