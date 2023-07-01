import type{ ActionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import FileInput from "~/components/file_input";
import SubmitButton from "~/components/submit_button";
import { uploadImage } from "~/service/s3.server";

export async function action ({request} : ActionArgs){
  const { imageLink, imageKey } = await uploadImage(request, "image_icon");

    return null
}

export default function ProductsManagement() {

  return (
    <Form method="POST" encType="multipart/form-data" >
      <FileInput name="image_recipe" />
      <SubmitButton text="envoyer"/>
    </Form>
    // <div>
    //   this is a product management page
    // </div>
  );
}