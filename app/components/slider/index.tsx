import RecipeCard from "../recipe/card";
import { isLikedByUser } from "~/utils/is.liked.by.user";
import HeaderSlider from "./index.header";
import BannerSlider from "./index.banner";
import LongArrowRightIcon from "~/assets/icons/LongArrowIcon";
import { motion } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";

export interface SliderProps {
  banner: boolean;
  profileId: number;
  content: Array<any>;
  title?: string;
  cardAxis?: "horizontal" | "vertical";
  linkText?: string;
  link?: string;
  shouldBeCentered?: boolean;
}

export default function Slider({
  banner,
  cardAxis,
  title,
  content,
  profileId,
  linkText,
  link,
  shouldBeCentered,
}: SliderProps) {
  const [width, setWidth] = useState(0);
  const [scrollXValue, setScrollXValue] = useState(0);

  const carousel = useRef<HTMLDivElement>(null);

  const innerCarousel = useRef<HTMLDivElement>(null);

  const getScrollXPosition = (state: number) => {
    setScrollXValue(state);
  };

  const handleClick = () => {
    // translate slider by length of one card
  };

  //   useEffect(() => {
  //     if (carousel?.current) {
  //       setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  //     }
  //   }, []);

  //   const [firstCardIsVisble, setFirstCardIsVisible] = useState<boolean | null>(
  //     null
  //   );
  //   const [lastCardIsVisble, setLastCardIsVisible] = useState<boolean | null>(
  //     null
  //   );

  //   const windowWidth = useRef([window.innerWidth]);
  //   let prev = "prev";
  //   let next = "next";
  //   const carouselNav = useRef();

  //   // @param  navWay = "prev" || "next"

  //   function isVisible(child, navWay) {
  //     let startingState = window.getComputedStyle(
  //       carouselNav.current.nextSibling
  //     ).transform;

  //     if (carouselNav.current.nextSibling.children) {
  //       const observer = new IntersectionObserver(([entry]) => {
  //         if (navWay === prev) {
  //           if (entry && entry.isIntersecting) {
  //             setFirstCardIsVisible(true);
  //           } else {
  //             setFirstCardIsVisible(false);
  //           }
  //         } else if (navWay === next) {
  //           if (entry && entry.isIntersecting) {
  //             setLastCardIsVisible(true);
  //           } else {
  //             setLastCardIsVisible(false);
  //           }
  //         } else if (startingState === "none") {
  //           alert("cant do that");
  //         }
  //       });
  //       observer.observe(child);
  //       return () => {
  //         return observer.disconnect(child) && isVisible;
  //       };
  //     }
  //   }

  //   function handleNextClick() {
  //     var lastChild =
  //       carouselNav.current.nextSibling.children[
  //         carouselNav.current.nextSibling.children.length - 1
  //       ];
  //     isVisible(lastChild, next);
  //     if (lastCardIsVisble) {
  //       setScrollXValue(-width);
  //     } else {
  //       setScrollXValue(scrollXValue - windowWidth.current[0]);
  //     }
  //   }

  //   function handlePrevClick() {
  //     var firstChild = carouselNav.current.nextSibling.children[0];
  //     isVisible(firstChild, prev);
  //     if (firstCardIsVisble === null) {
  //       setScrollXValue(0);
  //     }
  //     if (firstCardIsVisble) {
  //       setScrollXValue(0);
  //     } else if (firstCardIsVisble === false) {
  //       setScrollXValue(scrollXValue + windowWidth.current[0]);
  //     }
  //   }

  return (
    <div
      className={`flex flex-col my-4 ${shouldBeCentered ? "self-center" : ""}`}
    >
      <HeaderSlider title={title} linkText={linkText} link={link} />
      <div className="flex gap-x-8 relative">
        {banner && <BannerSlider title={title ?? ""} />}
        <motion.div
          className="overflow-x-scroll no-scrollbar"
          ref={carousel}
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            drag="x"
            whileTap={{ cursor: "grabbing" }}
            dragConstraints={{ right: 0, left: -width }}
            className="flex gap-x-6 w-full"
            ref={innerCarousel}
            animate={{ x: scrollXValue }}
            transition={{ ease: "easeInOut", duration: 1.2 }}
          >
            {content &&
              content.length > 0 &&
              content.map((recipe: any): JSX.Element => {
                return (
                  <RecipeCard
                    variant={cardAxis ?? "vertical"}
                    tags={recipe.tags}
                    key={recipe.id}
                    recipeId={recipe.id}
                    imageLink={recipe.image?.link}
                    recipeName={recipe.name}
                    recipeCalories={recipe.macro_recipe?.calories}
                    isLiked={isLikedByUser(recipe, profileId)}
                  />
                );
              })}
          </motion.div>

          <div className="absolute flex gap-x-10 items-center -bottom-8 right-6 text-secondary-300">
            <button
              //   ref={carouselNav}
              type="button"
              className="cursor-pointer"
              data-nav="prev"
              //   onClick={handleNextClick}
            >
              <LongArrowRightIcon />
            </button>
            <button className="rotate-180 cursor-pointer" data-nav="next">
              <LongArrowRightIcon />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
