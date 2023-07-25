import { useState, useEffect } from "react";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState<{ width: number, height: number }>({ width: 0, height: 0 });

    const handleSize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    useEffect(() => {

        window.addEventListener("resize", handleSize);

        handleSize();

        return () => window.removeEventListener("resize", handleSize);
    }, []);
    return windowSize;
};

export default useWindowSize