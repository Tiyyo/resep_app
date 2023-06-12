import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, isRouteErrorResponse, useActionData, useLoaderData, useNavigation, useRouteError } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { deleteIcon } from "~/api/delete.request";
import { getIcons } from "~/api/get.all.request";
import { addIcons } from "~/api/post.request";
import DeleteIcon from "~/assets/icons/DeleteIcon";
import Error from "~/components/error";
import FileInput from "~/components/file_input";
import Input from "~/components/input";
import SubmitButton from "~/components/submit_button";
import Table from "~/components/table";
import { deleteImageFromBucket, uploadImage } from "~/utils/s3.server";

export async function loader ({request} : LoaderArgs ) {
  const icons = await getIcons()
  return json({icons})
}

//-- Can't use 2 times request object had to make a copy first
export async function action ({request} : ActionArgs) {
  const copyRequest = request.clone()
  const formData = await copyRequest.formData()
  const name = formData.get('name')
  const rawTags = formData.get('tags')
  const {imageLink , imageKey} = await uploadImage(request);


  let tags : string[] | null = null

  if(rawTags && typeof rawTags === "string"){
     tags = rawTags.split(' ')
     tags.forEach((tag, index) =>  {
        if (tag === "") {
          tags.splice(index, 1)
        }
     })
  }

  // check existence params

  const form = {
    name , tags , imageLink ,imageKey
  }

  console.log(tags);

  try {
    const newIcon= await addIcons(form)
    console.log(newIcon);
    return json({status : 200 })  
  } catch (error : any) {
    const deletedIcon = await deleteImageFromBucket(form.imageKey)
    return json({error : error.message},  {status : 400})
  }

};



export default function EditIcons() {
  // ts errors remix bugs open issue here
  //https://github.com/remix-run/remix/issues/3931
  const {icons} = useLoaderData<typeof loader>()
  const addIconFormRef = useRef<HTMLFormElement>(null)
  const actionData = useActionData()
  const navigation = useNavigation()


  useEffect(() => {
    if(navigation.state === 'idle' && addIconFormRef && addIconFormRef.current ) {
      addIconFormRef.current.reset();
    }
  }, [navigation.state, addIconFormRef])

  return (
    <div className="pt-5">
      <Form method="POST" encType="multipart/form-data" ref={addIconFormRef}>
        <div className="flex center gap-x-4">
          <Input name="name" placeholder="Icon name" />
          <Input name="tags" placeholder="Tags" />
          <FileInput />
          <SubmitButton text="Create icon" />
        </div>
        <Error message={actionData?.error}/>
      </Form>
      <div>
        {icons && icons.length > 0 ? <Table data={icons} endpoint="/api/icons" /> : ""} 
        {/* {icons.length > 0 ? (
          <>
            {icons.map((icon) => {
              return (
                <div key={icon.id} className="center">
                  <img
                    src={icon.link}
                    alt=""
                    className="h-10 aspect-square rounded-full overflow-hidden"
                  />
                  <Form method="PATCH">
                    <input type="file" name="image" />
                    <input
                      type="text"
                      name="tag"
                      defaultValue={icon.tags.join(" ")}
                    />
                    <input type="submit" defaultValue={"Valid"} />
                  </Form>
                </div>
              );
            })}
          </>
        ) : (
          <p>Database don't contain any icon</p>
        )} */}
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  console.log(error);

  if (!isRouteErrorResponse(error)) {
    return (<Link to="/admin_panel/icons">Refresh</Link>);
  }

  if (error.status === 404) {
    return (
      <>
        <h2>Error 404</h2>
        <button> Rafraichir </button>
      </>
    );
  }
}
