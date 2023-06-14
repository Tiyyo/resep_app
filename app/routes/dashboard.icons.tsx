import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  Link,
  Outlet,
  isRouteErrorResponse,
  useActionData,
  useLoaderData,
  useNavigation,
  useRouteError,
} from "@remix-run/react";
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
import { UpdateIconsForm } from "~/components/update_forms";
import { wordsToArray } from "~/utils/wrodsToArray";
import { deleteImageFromBucket, uploadImage } from "~/service/s3.server";

export async function loader({ request }: LoaderArgs) {
  const icons = await getIcons();
  return json({ icons });
}

//-- Can't use 2 times request object had to make a copy first
export async function action({ request }: ActionArgs) {
  const copyRequest = request.clone();
  const formData = await copyRequest.formData();
  const name = formData.get("name");
  const rawTags = formData.get("tags");
  const { imageLink, imageKey } = await uploadImage(request);

  let tags: string[] 

  if (rawTags && typeof rawTags === "string") {
        tags = wordsToArray(rawTags)
  }

  // check existence params

  const form = {
    name,
    tags,
    imageLink,
    imageKey,
  };

  console.log(tags);

  try {
    const newIcon = await addIcons(form);
    console.log(newIcon);
    return json({ status: 200 });
  } catch (error: any) {
    const deletedIcon = await deleteImageFromBucket(form.imageKey);
    return json({ error: error.message }, { status: 400 });
  }
}

export default function EditIcons() {
  // ts errors remix bugs open issue here
  //https://github.com/remix-run/remix/issues/3931
  const { icons } = useLoaderData<typeof loader>();
  const addIconFormRef = useRef<HTMLFormElement>(null);
  const actionData = useActionData();
  const navigation = useNavigation();

  const dataTable = icons.map((icon) => {
    return { id: icon.id, image: icon.link, name: icon.name, tags: icon.tags };
  });

  useEffect(() => {
    if (
      navigation.state === "idle" &&
      addIconFormRef &&
      addIconFormRef.current
    ) {
      addIconFormRef.current.reset();
    }
  }, [navigation.state, addIconFormRef]);

  return (
    <>
      <Outlet context={{ UpdateForm : UpdateIconsForm}}/>
      <div className="pt-5">
        <Form method="POST" encType="multipart/form-data" ref={addIconFormRef}>
          <div className="flex center gap-x-4">
            <Input name="name" placeholder="Icon name" />
            <Input name="tags" placeholder="Tags" />
            <FileInput />
            <SubmitButton text="Create icon" />
          </div>
          <Error message={actionData?.error} />
        </Form>
        <div>
          {icons && icons.length > 0 ? (
            <Table
              data={dataTable}
              image={true}
              endpoint="/api/icons"
              search="name"
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (!isRouteErrorResponse(error)) {
    return <Link to="/admin_panel/icons">Refresh</Link>;
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
