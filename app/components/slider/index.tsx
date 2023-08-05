import RecipeCard from "../recipe/card";
import isLikedByUser from "~/utils/is.liked.by.user";
import HeaderSlider from "./index.header";
import BannerSlider from "./index.banner";
import { motion } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import type { SliderProps } from "./interface";
import SliderNav from "./index.nav";
import Carousel from "./index.carousel";

export default function Slider({
  banner,
  cardAxis,
  title,
  content,
  profileId,
  linkText,
  link,
  shouldBeCentered,
  navPosition = "spread",
}: SliderProps) {
  const [width, setWidth] = useState<number>(0);
  const [scrollXValue, setScrollXValue] = useState<number>(0);
  const [widthCard, setWidthCard] = useState<number | null>(null);

  const carousel = useRef<HTMLDivElement>(null);
  const innerCarousel = useRef<HTMLDivElement>(null);

  function nextSlide() {
    if (widthCard === null) return;
    scrollXValue + widthCard * 1.05 > 0
      ? setScrollXValue(0)
      : setScrollXValue(scrollXValue + widthCard * 1.05);
  }

  function prevSlide() {
    if (widthCard === null) return;

    Math.abs(scrollXValue - widthCard * 1.05) > width
      ? setScrollXValue(-width)
      : setScrollXValue(scrollXValue - widthCard * 1.05);
  }

  function handleClick(e: React.MouseEvent<HTMLElement>) {
    e.currentTarget.dataset.nav === "prev" ? prevSlide() : nextSlide();
  }

  useEffect(() => {
    if (carousel?.current && content.length > 0) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
    if (innerCarousel?.current && content.length > 0) {
      setWidthCard(innerCarousel.current.children[0].clientWidth);
    }
  }, [content.length]);

  if (!content || content.length === 0) return null;

  return (
    <div
      className={`border- my-4 flex flex-col ${
        shouldBeCentered ? "self-center" : ""
      }`}
    >
      <HeaderSlider title={title} linkText={linkText} link={link} />
      <div className="x relative flex flex-col gap-x-8 xl:flex-row ">
        <div className="hidden xl:block">
          {banner && <BannerSlider title={title ?? ""} />}
        </div>
        <Carousel deepth={1} navPosition={navPosition}>
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
                  recipeCalories={recipe.macros?.calories}
                  isLiked={isLikedByUser(recipe, profileId)}
                />
              );
            })}
        </Carousel>
      </div>
    </div>
  );
}
