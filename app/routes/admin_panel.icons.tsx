import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getIcons } from "~/api/get.all.request";
import { addIcons } from "~/api/post.request";
import { uploadImage } from "~/utils/s3.server";

export async function loader ({request} : LoaderArgs ) {
  const icons = await getIcons()

  return json(icons)
}

//-- Can't use 2 times request object had to make a copy first
export async function action ({request} : ActionArgs) {
  const copyRequest = request.clone()
  const formData = await copyRequest.formData()
  const name = formData.get('name')
  const rawTags = formData.get('tags')
  const imageS3Url = await uploadImage(request);

  let tags : string[] | null = null
  if(rawTags && typeof rawTags === "string"){
     tags = rawTags.split(' ')
     tags.forEach((t, index) =>  {
        if (t === "") {
          tags.splice(index, 1)
        }
     })
  }

  // check existence params
  console.log({name, tags, imageS3Url });
  const form = {
    name , tags , imageS3Url
  }
  const newIcon= await addIcons(form)
  console.log(newIcon);

 return null;
};



export default function EditIcons() {
  const loaderData = useLoaderData<typeof loader>()

  console.log(loaderData);
  return (
    <div>
      Icons edition here Doja
      <Form method="POST" encType="multipart/form-data">
        <label htmlFor="name">Name this icon</label>
        <input type="text" name="name" />

        <label htmlFor="tags">Give some tags to help to reference this icon</label>
        <input type="text" name="tags" />
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file_input"
        >
          Upload file
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="file_input_help"
          name="image"
          type="file"
        />
        <p
          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="file_input_help"
        >
          SVG, PNG, JPG or GIF (MAX. 800x400px).
        </p>
        <input type="submit" value={"Create Icon"}/>
      </Form>
      <div>Image Icon</div>
      <img src="https://groc-app.s3.eu-west-3.amazonaws.com/cliip2s2z0005wovz85i929ur.png" alt="" />
    </div>
  );
}
