import convertStringToNumber from "~/utils/convert.to.number";
import { deleteImageFromBucket, uploadImage } from "~/service/s3.server";
import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import wordsToArray from "~/utils/wrodsToArray";
import icon from "~/api/icon";
import ResponseError from "~/helpers/response/response.error";
import ServerError from "~/helpers/errors/server.error";
import ResponseValid from "~/helpers/response/response.ok";
import UserInputError from "~/helpers/errors/user.inputs.error";
import isEmptyObject from "~/utils/is.empty.object";
import MethodError from "~/helpers/errors/method.error";
import type { Icon, IconCreatInput } from "~/types";

export async function action({ request }: ActionArgs) {
  const copyRequest = request.clone();
  const method = copyRequest.method.toLowerCase();
  const formData = await copyRequest.formData();

  switch (method) {
    case "post": {
      const rawTags = formData.get("tags");
      try {
        let fieldErrors: Record<string, string> = {};
        let tags: string[] | undefined = undefined;

        const { imageLink, imageKey } = await uploadImage(
          request,
          "image_icon"
        );

        if (!imageLink || !imageKey) {
          fieldErrors.image_icon = "image is mandatory";
        }

        if (!formData.get("name")) {
          fieldErrors.name = "name is mandatory";
        }
        const name = formData.get("name") as string;

        if (rawTags && typeof rawTags === "string") {
          tags = wordsToArray(rawTags);
        }

        const form: IconCreatInput = {
          name,
          tags,
          link: imageLink,
          image_key: imageKey,
        };

        if (isEmptyObject(fieldErrors)) {
          return new ResponseError(
            new UserInputError("Could not add icon"),
            fieldErrors
          ).send();
        }

        const icons = await icon.add(form);

        if (!icons) {
          await deleteImageFromBucket(form.image_key);
          return new ResponseError(
            new ServerError("Could not add icon")
          ).send();
        }
        return new ResponseValid(201, "Successfully added", null).send();
      } catch (error: any) {
        return new ResponseError(error).send();
      }
    }
    case "patch": {
      let fieldErrors: Record<string, string> = {};
      const rawTags = formData.get("tags");

      if (!formData.get("name")) {
        fieldErrors.name = "A name is mandatory";
      }
      let name = formData.get("name") as string;

      if (!formData.get("id")) {
        fieldErrors.id = "An id should be provided";
      }
      let id = parseInt(formData.get("id") as string);

      let imageKey = "";
      let imageLink = "";

      if (isEmptyObject(fieldErrors)) {
        return new ResponseError(
          new UserInputError("Could not update icon"),
          fieldErrors
        ).send();
      }

      if (formData.get("image_icon")) {
        const { imageLink: link, imageKey: key } = await uploadImage(
          request,
          "image_icon"
        );
        imageLink = link;
        imageKey = key;

        if (imageKey && imageLink) {
          await deleteImageFromBucket(formData.get("key") as string);
        }
      } else {
        imageKey = formData.get("key") as string;
        imageLink = formData.get("link") as string;
      }

      let tags: string[] | undefined;
      if (rawTags && typeof rawTags === "string") {
        tags = wordsToArray(rawTags);
      }

      const form: Icon = { name, id, tags, image_key: imageKey, link: imageLink };

      try {
        await icon.update(form);
        return redirect("/dashboard/icons");
      } catch (error) {
        return new ResponseError(error).send();
      }
    }
    case "delete": {
      let fieldErrors: Record<string, string> = {};
      if (!formData.get("id")) {
        fieldErrors.id = "An id should be provided";
      }

      if (isEmptyObject(fieldErrors)) {
        return new ResponseError(
          new UserInputError("Could not delete icon"),
          fieldErrors
        ).send();
      }

      const id = formData.get("id") as string;
      const idString = { id };

      const idNumber = await convertStringToNumber(idString);

      try {
        if (!idNumber.id)
          return new ResponseError(new ServerError("wrong id")).send();

        const deletedIcon = await icon.destroy(idNumber.id);

        await deleteImageFromBucket(deletedIcon.image_key);

        return new ResponseValid(204, "Successfully deleted", null).send();
      } catch (error: any) {
        return new ResponseError(error).send();
      }
    }
    default: {
      return new ResponseError(new MethodError("invalid method")).send();
    }
  }
}
