import isLikedByUser from "~/utils/is.liked.by.user";

export default function RecipeContainer({
  Card,
  data,
  profileId,
  pickedMeal,
  likeByDefault = false,
}: {
  Card: any;
  data: any;
  profileId?: number;
  likeByDefault?: boolean;
  pickedMeal?: number;
}) {
  return (
    <div className="grid h-full grid-cols-card justify-items-center gap-4 p-4 xl:flex  xl:flex-wrap xl:content-start xl:justify-start ">
      {data &&
        data.length > 0 &&
        data.map((item: any, index: number) => {
          return Card({
            key: item?.id,
            recipeId: item.id,
            imageLink: item.image?.link,
            recipeName: item.name,
            recipeCalories: item.macros.calories,
            isLiked: likeByDefault ? true : isLikedByUser(item, profileId),
            pickedMeal: pickedMeal,
          });
        })}
    </div>
  );
}
