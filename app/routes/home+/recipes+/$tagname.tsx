import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import recipe from "~/api/recipe";
import RecipeContainer from "~/components/container";
import RecipeCard from "~/components/recipe/card";
import ServerError from "~/helpers/errors/server.error";
import ResponseError from "~/helpers/response/response.error";
import LayoutRecipePages from "~/layout/LayoutRecipesPage";
import capitalize from "~/utils/capitalize";
import { groupedTags } from "~/constants/grouped.tags";

export async function loader({ request, params }: LoaderArgs) {
  const { tagname } = params;
  if (!tagname) throw new ServerError("Params tagname is missing");
  try {
    if (tagname?.toLowerCase() === "new") {
      const recipes = await recipe.findLast(true);
      return json({ recipes });
    }
    const recipes = await recipe.findByTags(groupedTags[tagname.toLowerCase()]);
    return json({ recipes });
  } catch (error) {
    return new ResponseError(error).send();
  }
}

export default function () {
  const { recipes } = useLoaderData();
  const params = useParams();

  return (
    <LayoutRecipePages title={capitalize(params?.tagname)}>
      <RecipeContainer data={recipes} Card={RecipeCard} />
    </LayoutRecipePages>
  );
}
