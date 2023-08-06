import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { withZod } from "@remix-validated-form/with-zod";
import convertStringToNumber from "~/utils/convert.to.number";
import * as Z from "zod";
import { validationError } from "remix-validated-form";
import type { Macros } from "~/types/index";
import macro from "~/api/macro";
import ResponseError from "~/helpers/response/response.error";
import ResponseValid from "~/helpers/response/response.ok";
import MethodError from "~/helpers/errors/method.error";
import ServerError from "~/helpers/errors/server.error";

export const validator = withZod(
  Z.object({
    food: Z.string().toLowerCase(),
    calories: Z.string().min(1, { message: "A number is required" }),
    proteins: Z.string().min(1, { message: "A number is required" }),
    carbs: Z.string().min(1, { message: "A number is required" }),
    fat: Z.string().min(1, { message: "A number is required" }),
    water: Z.string().min(1, { message: "A number is required" }),
    id: Z.string().optional(),
  })
);

export async function action({ request }: ActionArgs) {
  const method = request.method.toLowerCase();

  switch (method) {
    case "post": {
      const formData = await validator.validate(await request.formData());
      if (formData.error) return validationError(formData.error);
      const { food, calories, proteins, carbs, fat, water } = formData.data;

      const numberFields = {
        calories,
        proteins,
        carbs,
        fat,
        water,
      };
      try {
        const formConverted = await convertStringToNumber(numberFields);
        let form = { ...formConverted, food: food?.toLowerCase() };

        const newMacro = await macro.add(form as Macros);
        if (newMacro) {
          return new ResponseValid(201, "Successfully added", null);
        }
      } catch (error: any) {
        return new ResponseError(error);
      }
    }
    case "patch": {
      const formData = await validator.validate(await request.formData());
      if (formData.error) return validationError(formData.error);
      const { food, calories, proteins, carbs, fat, water, id } = formData.data;

      const numberFields = {
        id,
        calories,
        proteins,
        carbs,
        fat,
        water,
      };

      try {
        const formConverted = await convertStringToNumber(numberFields);

        let form = { ...formConverted, food: food?.toLowerCase() } as Macros;
        await macro.update(form);
        return redirect("/dashboard/macros", { status: 303 });
      } catch (error: any) {
        return new ResponseError(error);
      }
    }
    case "delete": {
      const formData = await request.formData();
      let id: string | null = null;

      if (typeof formData.get("id") === "string") {
        id = formData.get("id") as string;
      }
      const values = {
        id: id,
      };

      try {
        const formConverted = await convertStringToNumber(values);

        if (!formConverted.id) throw new ServerError("No id provided");

        await macro.destroy(formConverted.id);
        return json({ message: "Successfully deleted" }, { status: 204 });
      } catch (error) {
        return new ResponseError(error);
      }
    }
    default: {
      return new ResponseError(new MethodError("Invalid Method"));
    }
  }
}
