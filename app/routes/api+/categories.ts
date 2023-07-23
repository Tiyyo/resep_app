import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import category from "~/api/category";
import MethodError from "~/helpers/errors/method.error";
import ServerError from "~/helpers/errors/server.error";
import UserInputError from "~/helpers/errors/user.inputs.error";
import ResponseError from "~/helpers/response/response.error";
import ResponseValid from "~/helpers/response/response.ok";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const method = request.method.toLowerCase();

  switch (method) {
    case "post": {
      const name = formData.get("category");
      if (typeof name !== "string") {
        return new ResponseError(
          new UserInputError("name argument should be a string")
        ).send();
      }
      try {
        await category.add(name);
        return new ResponseValid(201, "Successfully added", null).send();
      } catch (error) {
        return new ResponseError(error).send();
      }
    }
    case "patch": {
      const name = formData.get("category");
      const categoryId = formData.get("id");

      let id: number | undefined = undefined;

      if (typeof name !== "string") {
        return new ResponseError(
          new UserInputError("name argument should be a string")
        ).send();
      }

      if (typeof categoryId === "string") {
        id = parseInt(categoryId, 10);
      }

      if (typeof id !== "number") {
        return new ResponseError(
          new UserInputError("id argument should be a number")
        ).send();
      }

      try {
        await category.update({ name, id });
        return redirect("/dashboard/categories");
      } catch (error) {
        return new ResponseError(error).send();
      }
    }
    case "delete": {
      const categoryId = formData.get("id");
      let id: number | null = null;

      if (typeof categoryId === "string") {
        id = parseInt(categoryId, 10);
      }

      if (typeof id !== "number") {
        return new ResponseError(
          new UserInputError("id argument should be a number")
        ).send();
      }
      try {
        await category.destroy(id);
        return new ResponseValid(204, "Successfully deleted", null).send();
      } catch (error) {
        return new ResponseError(error).send();
      }
    }
    default: {
      return new ResponseError(new MethodError("Invalid method")).send();
    }
  }
}
