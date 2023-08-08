import RecipeCard from "../recipe/card";
import isLikedByUser from "~/utils/is.liked.by.user";
import HeaderSlider from "./index.header";
import BannerSlider from "./index.banner";
import type { SliderProps } from "./interface";
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
  if (!content || content.length === 0) return null;

  return (
    <div
      className={`border- 3xl my-4 flex flex-col ${
        shouldBeCentered ? "xl:self-center" : ""
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
