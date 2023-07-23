import { Form } from "@remix-run/react";
import { useFetcher } from "react-router-dom";
import SubmitButton from "../submit_button";
import FileInput from "../file_input";
import Input from "../input";
import type { UpdateIconsFormProps } from "./interface";
import Error from "../error";

export function UpdateIconsForm({ icon }: UpdateIconsFormProps) {
  const updateIcon = useFetcher();

  return (
    <updateIcon.Form
      method="PATCH"
      encType="multipart/form-data"
      action="/api/icons"
    >
      <div className="flex flex-col items-start justify-start gap-y-4">
        <input type="text" hidden name="id" defaultValue={icon.id} />
        <input type="text" hidden name="link" defaultValue={icon.link} />
        <input type="text" hidden name="key" defaultValue={icon.image_key} />

        <Input
          name="name"
          placeholder="Icon name"
          label="Name"
          defaultValue={icon.name}
          variant="grid"
          error={updateIcon?.data?.error?.fieldErrors?.name}
        />

        <Input
          name="tags"
          placeholder="Tags"
          label="Tags"
          width="full"
          defaultValue={icon?.tags?.join(" ")}
          variant="grid"
        />

        <FileInput
          name="image_icon"
          error={updateIcon?.data?.error?.fieldErrors?.image_icon}
        />

        <div className="self-center">
          <SubmitButton text="Edit icon" />
        </div>
      </div>
      <Error message={updateIcon?.data?.error?.userMessage} />
    </updateIcon.Form>
  );
}
