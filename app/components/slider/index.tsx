import RecipeCard from '../recipe/card';
import isLikedByUser from '~/utils/is.liked.by.user';
import HeaderSlider from './index.header';
import BannerSlider from './index.banner';
import LongArrowRightIcon from '~/assets/icons/LongArrowIcon';
import { motion } from 'framer-motion';
import React, { useEffect, useState, useRef } from 'react';
import { SliderProps } from './interface';

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
  const [width, setWidth] = useState<number>(0);
  const [scrollXValue, setScrollXValue] = useState<number>(0);
  const [widthCard, setWidthCard] = useState<number | null>(null);

  const carousel = useRef<HTMLDivElement>(null);
  const innerCarousel = useRef<HTMLDivElement>(null);

  function nextSlide() {
    if (widthCard === null) return;
    setScrollXValue(scrollXValue + widthCard * 1.05);
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
    e.currentTarget.dataset.nav === 'prev' ? prevSlide() : nextSlide();
  }

  useEffect(() => {
    if (carousel?.current && content.length > 0) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
    if (innerCarousel?.current && content.length > 0) {
      setWidthCard(innerCarousel.current.children[0].clientWidth);
    }
  }, []);

  return (
    <div
      className={`flex flex-col my-4 ${shouldBeCentered ? 'self-center' : ''}`}
    >
      <HeaderSlider title={title} linkText={linkText} link={link} />
      <div className="flex gap-x-8 relative">
        {banner && <BannerSlider title={title ?? ''} />}
        <motion.div
          className="overflow-x-scroll no-scrollbar scroll-smooth px-6"
          ref={carousel}
          whileTap={{ cursor: 'grabbing' }}
        >
          <motion.div
            drag="x"
            whileTap={{ cursor: 'grabbing' }}
            dragConstraints={{ right: 0, left: -width }}
            className="flex gap-x-6 w-full"
            ref={innerCarousel}
            animate={{ x: scrollXValue }}
            transition={{ ease: 'easeInOut', duration: 1.2 }}
          >
            {content &&
              content.length > 0 &&
              content.map((recipe: any): JSX.Element => {
                return (
                  <RecipeCard
                    variant={cardAxis ?? 'vertical'}
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
          </motion.div>
          <div className="absolute flex gap-x-10 items-center -bottom-8 right-6 text-secondary-300">
            <button
              type="button"
              className="cursor-pointer"
              data-nav="next"
              onClick={handleClick}
            >
              <LongArrowRightIcon />
            </button>
            <button
              className="rotate-180 cursor-pointer"
              data-nav="prev"
              onClick={handleClick}
            >
              <LongArrowRightIcon />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
