import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { withZod } from "@remix-validated-form/with-zod";
import * as Z from "zod";
import convertStringToNumber from "~/utils/convert.to.number";
import { validationError } from "remix-validated-form";
import type { IngredientCreateForm, IngredientUpdateForm } from "~/api/interfaces";
import ingredient from "~/api/ingredient";
import ResponseValid from "~/helpers/response/response.ok";
import ResponseError from "~/helpers/response/response.error";
import ServerError from "~/helpers/errors/server.error";
import MethodError from "~/helpers/errors/method.error";
import UserInputError from "~/helpers/errors/user.inputs.error";

export const validator = withZod(
  Z.object({
    name: Z.string().toLowerCase().min(1, { message: "A name is required" }),
    categoryId: Z.string().min(1, { message: "You have a to pick a category" }),
    unitWeight: Z.string().optional(),
    macrosId: Z.string().optional(),
    iconId: Z.string().optional(),
    ingredientId: Z.string().min(1, { message: "Id not provided" }).optional(),
  })
);

export async function action({ request }: ActionArgs) {
  const method = request.method.toLowerCase();

  switch (method) {
    case "post": {
      const formData = await validator.validate(await request.formData());
      if (formData.error) return validationError(formData.error);

      const { iconId, categoryId, macrosId, name, unitWeight } = formData.data;

      const fieldToConvert = {
        iconId,
        categoryId,
        macrosId,
        unitWeight: unitWeight ?? "0",
      };

      try {
        const formConverted = await convertStringToNumber(fieldToConvert);

        let form: IngredientCreateForm | undefined = undefined;

        if (formConverted.categoryId) {
          form = {
            name,
            categoryId: formConverted.categoryId,
            iconId: formConverted.iconId,
            macrosId: formConverted.macrosId,
            unitWeight: formConverted.unitWeight,
          };
        }

        if (form) {
          await ingredient.add(form);
          return new ResponseValid(201, "Successfully added", null);
        }
      } catch (error: any) {
        return new ResponseError(error);
      }
    }
    case "patch": {
      const formData = await validator.validate(await request.formData());
      if (formData.error) return validationError(formData.error);

      const { ingredientId, iconId, categoryId, macrosId, name, unitWeight } =
        formData.data;

      const fieldToConvert = {
        iconId,
        categoryId,
        macrosId,
        ingredientId,
        unitWeight: unitWeight ?? "0",
      };

      try {
        // An exception is thrown if values are invalid and/or not positive
        const formConverted = await convertStringToNumber(fieldToConvert);

        // TODO fix this typescript error
        let form: IngredientUpdateForm = undefined;

        if (formConverted.categoryId && formConverted.ingredientId) {
          form = {
            name,
            categoryId: formConverted.categoryId,
            iconId: formConverted.iconId,
            macrosId: formConverted.macrosId,
            unitWeight: formConverted.unitWeight,
            ingredientId: formConverted.ingredientId,
          };
        }
        if (!form) throw new UserInputError("Invalid values", "Invalid values");
        await ingredient.update(form);
        return redirect("/dashboard/ingredients");
      } catch (error: any) {
        return new ResponseError(error);
      }
    }
    case "delete": {
      const formData = await request.formData();
      const ingredientId = formData.get("id");

      if (typeof ingredientId === "string" && ingredientId) {
        await ingredient.destroy(+ingredientId);
        return new ResponseValid(204, "Successfully deleted", null);
      }
      return new ResponseError(
        new ServerError("a valid is mandatory to delete this item")
      );
    }
    default: {
      return new ResponseError(new MethodError("Invalid method"));
    }
  }
}
