import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { withZod } from "@remix-validated-form/with-zod";
import { buildRecipe } from "~/service/recipe_builder/index.server";
import * as Z from "zod";
import { validationError } from "remix-validated-form";
import { deleteImageFromBucket, uploadImage } from "~/service/s3.server";
import recipe from "~/api/recipe";
import ResponseError from "~/helpers/response/response.error";
import MethodError from "~/helpers/errors/method.error";
import ResponseValid from "~/helpers/response/response.ok";
import ServerError from "~/helpers/errors/server.error";

export const validator = withZod(
  Z.object({
    id: Z.string().optional(),
    ingredient: Z.string()
      .array()
      .min(3, { message: "At least 3 ingredients are required" }),
    quantity: Z.string()
      .array()
      .min(3, { message: "At least 3 ingredients are required" }),
    unit: Z.string()
      .array()
      .min(3, { message: "At least 3 ingredients are required" }),
    name: Z.string().min(12, {
      message: "Must be a at least 12 characters long",
    }),
    image_recipe: Z.any().optional(),
    prepTime: Z.string().min(1, { message: "Required" }),
    cookTime: Z.string().min(1, { message: "Required" }),
    author: Z.string(),
    servings: Z.string().min(1, { message: "Required" }),
    tags: Z.string().array().optional(),
    ytLink: Z.string()
      .startsWith("https://www.youtube.com/", {
        message: "Only youtube links are allowed",
      })
      .optional()
      .or(Z.literal("")),
    level: Z.union([Z.literal("easy"), Z.literal("medium"), Z.literal("hard")]),
    instructions: Z.string()
      .array()
      .min(2, { message: "At least 2 instructions is required" }),
  }).refine(
    (value) =>
      value.ingredient.length === value.quantity.length &&
      value.ingredient.length === value.unit.length,
    {
      message: "Ingredient ,quantity and unit should have the same length",
      path: ["ingredients"],
    }
  )
);

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const searchParams = url.searchParams.getAll("query");
  const searchResult = await recipe.searchRaw(searchParams);
  if (!searchResult) return json({ message: "No result" }, { status: 404 });
  return json({ searchResult }, { status: 200 });
}

export async function action({ request }: ActionArgs) {
  const copyRequest = request.clone();
  const method = copyRequest.method.toLowerCase();

  switch (method) {
    case "post": {
      const formData = await validator.validate(await copyRequest.formData());

      let imageLink: string | undefined = undefined;
      let imageKey: string | undefined = undefined;

      if (formData.error) return validationError(formData.error);

      if (formData.data.image_recipe) {
        let { imageLink: link, imageKey: key } = await uploadImage(
          request,
          "image_recipe"
        );
        imageLink = link;
        imageKey = key;
      }
      const {
        ingredient: ingredients,
        quantity: qty,
        unit: units,
        name,
        prepTime,
        cookTime,
        author,
        servings,
        tags,
        ytLink,
        level,
        instructions,
        // image_recipe,
      } = formData.data;

      let measures: Array<{
        ingredient: string;
        unit_measure: string;
        qty: string;
      }> = [];

      ingredients.forEach((_ingredient, index) => {
        measures.push({
          ingredient: ingredients[index],
          unit_measure: units[index],
          qty: qty[index],
        });
      });

      const form = {
        name,
        prepTime,
        cookTime,
        author,
        tags,
        servings,
        ytLink,
        level,
        qty,
        measures,
        instructions,
        image: imageKey &&
          imageLink && {
          imageKey: imageKey,
          link: imageLink,
          width: 400,
        },
      };

      try {
        const recipe = await buildRecipe(form);
        if (!recipe) {
          if (!imageKey)
            throw new ServerError(
              "Could not find image key to delete pending image"
            );
          await deleteImageFromBucket(imageKey);
        }
        return new ResponseValid(201, "Successfully added", null);
      } catch (error: any) {
        return new ResponseError(error);
      }
    }
    case "patch": {
      // bloc de code
    }
    case "delete": {
      // bloc de code
    }
    default: {
      return new ResponseError(new MethodError("Invalid method"));
    }
  }
}
