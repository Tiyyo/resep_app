import { json, type LoaderArgs } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Link,
  useFetcher,
  useLoaderData,
  useNavigate,
  useRouteError,
} from "@remix-run/react";
import Label from "~/components/label";
import AddFavoriteIcon from "~/components/like_icon";
import RatingIndicator from "~/components/rating/RatingIndicator";
import CommentSection from "~/components/recipe/comment_section";
import LinearMacrosProportion from "~/components/recipe/graph_macro";
import RecipeInfos from "~/components/recipe/infos";
import IngredientsList from "~/components/recipe/ingredients";
import InstructionsList from "~/components/recipe/instructions";
import NutritionFacts from "~/components/recipe/nutrition_facts";
import TitleLevel2 from "~/components/title/TitleLevel2";
import { getProfile } from "~/utils/get.user.infos";
import recipe from "~/api/recipe";
import review from "~/api/review";
import ServerError from "~/helpers/errors/server.error";
import Error404 from "~/layout/Error404Page";
import ArrowReturn from "~/assets/icons/ArrowReturn";
import type { UserRecipeInfo } from "~/types";

export async function loader({ params, request }: LoaderArgs) {
  if (!params.id) throw new ServerError("Invalid params");
  const recipeId = +params.id;
  let response = {};

  const result = await Promise.all([
    recipe.findById(recipeId),
    review.findAllByRecipeId(recipeId),
    review.aggretate(recipeId),
  ])
    .then((results) => {
      const foundRecipe = results[0];
      const reviews = results[1];
      const aggregate = results[2];
      return (response = { foundRecipe, reviews, aggregate });
    })
    .catch((error) => {
      console.log("error", error.message);
    });

  response = { ...result };

  try {
    const profile = await getProfile(request);
    response = { ...response, profile };

    if (profile) {
      const infos = await review.findByIds(profile.id, recipeId);
      response = { ...response, infos };
    }
  } catch (error: any) {
    console.log(error.message);
  }
  return json(response);
}

export default function RecipePage() {
  const {
    foundRecipe: recipe,
    reviews,
    profile,
    infos: infosRecipeByUser,
    aggregate,
  } = useLoaderData();

  const toggleFavorite = useFetcher<any>();
  const navigate = useNavigate();

  const handleClickFavorite = () => {
    const formData = new FormData();
    formData.append("recipeId", recipe.id.toString());
    formData.append("authorId", profile.id.toString());

    toggleFavorite.submit(formData, {
      method: "post",
      action: "/api/recipes/favorites",
      replace: true,
    });
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div
        className="h-8 w-full cursor-pointer text-secondary-300"
        onClick={goBack}
      >
        <ArrowReturn size="6" />
      </div>
      <div className="mx-auto flex max-w-[1600px] flex-col pb-4 ">
        <div className="flex w-full basis-11/12 flex-col items-center xl:flex-row  xl:items-start">
          <div className="rounded-mdp-2 order-1 flex w-full max-w-[600px] flex-col gap-y-3 xl:min-w-[450px]">
            {/* title */}
            <div className="flex items-center justify-between gap-x-6 xl:justify-start">
              <TitleLevel2 title={recipe.name} />
              <AddFavoriteIcon
                onClick={handleClickFavorite}
                infosRecipeByUser={infosRecipeByUser}
              />
            </div>
            {/* image */}
            <div className="center aspect-2/1 max-h-36 w-full overflow-hidden rounded-2xl py-4">
              <img
                src={recipe.image.link}
                alt=""
                className="w-full rounded-2xl object-cover object-center"
              />
            </div>
            <RecipeInfos
              prepTime={recipe.prep_time}
              cookTime={recipe.cook_time}
              difficulty={recipe?.difficulty?.name}
              favorite={aggregate?._count?.is_liked}
            />
            <div className="my-4 flex justify-between">
              <RatingIndicator
                avgRating={aggregate?._avg?.rating}
                countRating={aggregate?._count?.rating}
                numStars={5}
              />
              <p className="text-8 opacity-90">
                by{" "}
                <span className="capitalize">{recipe?.author?.username}</span>
              </p>
            </div>
            <div className="my-2 flex gap-x-1 capitalize">
              {recipe.tags.map((label: string, index: number) => {
                return <Label key={index} label={label} />;
              })}
            </div>
            <NutritionFacts
              calories={recipe.macros.calories}
              carbs={recipe.macros.carbs}
              fat={recipe.macros.fat}
              proteins={recipe.macros.proteins}
              water={recipe.macros.water}
            />
            <LinearMacrosProportion macros={recipe?.macros} />
          </div>
          <div className="order-3 flex w-full flex-grow flex-col gap-y-6 px-4 md:max-w-[700px]">
            <InstructionsList instructions={recipe.instructions} />
            <CommentSection
              reviews={reviews as UserRecipeInfo[]}
              recipeId={recipe.id}
              authorId={profile?.id}
            />
          </div>
          <div className="order-2 mx-auto w-4/5 min-w-[290px] max-w-[720px] xl:order-3  xl:mx-6 xl:w-1/3 xl:max-w-[300px]">
            <IngredientsList
              measures={recipe.measures}
              servings={recipe.servings}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (!isRouteErrorResponse(error)) {
    return (
      <div className="center h-full w-full flex-col">
        <p className="text-10 font-semibold">
          We are sorry ... something went wrong
        </p>
        <p>
          &#8608; &#8608; <Link to="/home">Click here to refresh</Link> &#8606;
          &#8606;
        </p>
        ;
      </div>
    );
  }

  if (error.status === 404) {
    return <Error404 />;
  }
}
