import { useFetcher, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Recipe } from "~/types/recipe";
import RecipeCard from "../recipe/card";
import isLikedByUser from "~/utils/is.liked.by.user";
import SearchIcon from "~/assets/icons/SearchIcon";

export default function FinderSearch({
  recipes: firstLoadedRecipes,
  profileId,
}: {
  recipes: Recipe[];
  profileId: number;
}) {
  const customFetch = useFetcher();
  const [recipes, setRecipes] = useState([]);
  const params = useParams();

  const handleChange = async (e: React.ChangeEvent<HTMLFormElement>) => {
    const searchValues = e.currentTarget.searchRecipe.value;
    if (searchValues.length < 3) return setRecipes(firstLoadedRecipes);
    const arrayOfSearchValues = searchValues.split(" ");

    const mapQueries = new Map();
    arrayOfSearchValues.forEach((value: string) =>
      mapQueries.set("query", value)
    );
    const queryObject = Object.fromEntries(mapQueries);
    const queryParamsString = new URLSearchParams(queryObject);
    customFetch.load(`/api/recipes?${queryParamsString.toString()}`);
  };

  useEffect(() => {
    if (!customFetch.data || customFetch.data.searchResult.length === 0) return;
    setRecipes(customFetch.data.searchResult);
  }, [customFetch.data]);

  useEffect(() => {
    setRecipes(firstLoadedRecipes);
  }, []);
  return (
    <div className="mx-auto max-w-[1325px]">
      <customFetch.Form
        className="my-1 flex items-end gap-x-2"
        onChange={handleChange}
        method="GET"
      >
        <div>
          <SearchIcon size="5" />
        </div>
        <input
          type="text"
          className="border-b border-b-gray-950 bg-primary-200 placeholder:text-7 focus:border-0 focus-visible:border-b-secondary-300  focus-visible:outline-none focus-visible:ring-0"
          name="searchRecipe"
          placeholder="Search for a recipe ..."
        />
      </customFetch.Form>
      {recipes.length !== 0 || recipes ? (
        <div className="flex w-full flex-wrap content-start justify-start gap-4 py-8">
          {recipes.map((recipe: Recipe) => {
            return (
              <RecipeCard
                key={recipe.id}
                recipeId={recipe.id}
                imageLink={recipe.link || recipe.image?.link}
                recipeName={recipe.name}
                servings={recipe.servings}
                recipeCalories={recipe.calories || recipe.macros?.calories}
                isLiked={isLikedByUser(recipe, profileId)}
                pickedMeal={Number(params.index)}
              />
            );
          })}
        </div>
      ) : (
        <div className="center mt-10 italic">No recipes found</div>
      )}
    </div>
  );
}
