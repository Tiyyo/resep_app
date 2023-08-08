import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "@remix-run/react";
import SliderNav from "./index.nav";
import type { SliderNavVariant } from "./index.nav";

export interface CarouselProps {
  children: React.ReactNode;
  deepth?: number;
  navPosition: SliderNavVariant;
  extraStyle?: string;
}

export default function Carousel({
  children,
  deepth,
  navPosition = "spread",
  extraStyle,
}: CarouselProps) {
  const [width, setWidth] = useState<number | 1>(1);
  const [widthCard, setWidthCard] = useState<number | null>(null);
  const [scrollXValue, setScrollXvalue] = useState<number>(0);
  const carousel = useRef<HTMLDivElement>(null);
  const innerCarousel = useRef<HTMLDivElement>(null);
  const params = useParams();

  function nextSlide() {
    if (!width || !widthCard) return;
    let delta = scrollXValue - widthCard;
    if (deepth && deepth > 1) {
      delta = scrollXValue - deepth * widthCard;
    }
    if (Math.abs(delta) > width) {
      setScrollXvalue(-width);
    } else {
      setScrollXvalue(delta);
    }
  }

  function prevSlide() {
    if (!width || !widthCard) return;
    let delta = scrollXValue + widthCard;
    if (deepth && deepth > 1) {
      delta = scrollXValue + deepth * widthCard;
    }
    if (delta > 0) {
      setScrollXvalue(0);
    } else {
      setScrollXvalue(delta);
    }
  }

  const handleClickNav = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget.dataset.nav === "prev") {
      prevSlide();
    } else {
      nextSlide();
    }
  };

  useEffect(() => {
    if (innerCarousel?.current) {
      setWidthCard(innerCarousel.current.children[0].clientWidth);
    }
  }, [params]);

  useEffect(() => {
    if (carousel?.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [params]);

  return (
    <>
      <motion.div
        className={`no-scrollbar flex w-full gap-x-6 overflow-x-scroll px-6 ${extraStyle}`}
        ref={carousel}
      >
        <motion.div
          drag="x"
          whileTap={{ cursor: "grabbing" }}
          dragConstraints={{ right: 0, left: -width }}
          className="flex w-full gap-x-6"
          ref={innerCarousel}
          animate={{ x: scrollXValue }}
          transition={{ ease: "easeInOut", duration: 1 }}
        >
          {children}
        </motion.div>
      </motion.div>
      <SliderNav handleClick={handleClickNav} variant={navPosition} />
    </>
  );
}
