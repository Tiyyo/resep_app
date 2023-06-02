import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData, useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { getCategories } from "~/api/get.all.request";
import { addCategory } from "~/api/post.request";
import DeleteIcon from "~/assets/icons/DeleteIcon";
import EditIcon from "~/assets/icons/EditIcon";
import ValidIcon from "~/assets/icons/ValidIcon";
import { FormField } from "~/components/form_field";

export async function loader ({request} : LoaderArgs) {
    const categories = await getCategories()
    return json({categories})
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("category");
  if (typeof name !== "string") {
    return json({ error: "name argument should be a string" }, { status: 400 });
  }
  const createCategory = await addCategory(name);

  const errors = { error: "this is an error" };

  if (createCategory) {
    // console.log(createCategory, "Create Category");
    return json(
      {
        error: "Failed to insert into database",
        fields: { name: "This category already exist in database" },
      },
      { status: 400 }
    );
  } else {
    return json(
      {
        error: "Failed to insert into database",
        fields: { name: "This category already exist in database" },
      },
      { status: 400 }
    );
  }
}
    


export default function () {
    const {categories} = useLoaderData<typeof loader>()
    const addCategory = useFetcher()
    const [errorText, setErrorText] = useState("")

    const addFormState = addCategory.state
    const addFormRef = useRef()

    useEffect(() => {
      if(addCategory.type === 'done' ) {
        addFormRef.current?.reset();
        setErrorText(addCategory?.data?.fields?.name)
      }
    }, [addFormState, addCategory.type])

  return (
    <div className="overflow-y-scroll flex flex-col gap-y-4">
      <addCategory.Form method="post" action="/api/categories" ref={addFormRef}>
        <FormField htmlFor="category" label="Category" type="text"/>  
      </addCategory.Form>

      <div className="text-red font-semibold">
      {errorText ? <>
        <div>{errorText}</div>
      </> : ""}
      </div>

      {categories.length > 0 ? <div className="flex justify-around flex-wrap gap-4 ">
        {categories.map((c) => <Category key={c.id} data={c}/>)}
      </div> :  <p>Database doesn't contain any categories</p>}
    </div>
  );
}

function Category ({data}) {
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const deleteCategory = useFetcher()
  const patchCategory = useFetcher()

  console.log(patchCategory.state)

  const handleClick = (e?: any):void => {
    if(patchCategory.state === "idle")
    setIsDisabled(!isDisabled)
  }

  const handleSubmit = ():void => {
      console.log(patchCategory.submit());
  } 


  return (
    <div className="flex gap-x-2">
      <patchCategory.Form method="PATCH" action="/api/categories">
        <label htmlFor="name"></label>
        <input type="text" name="category_id" value={data.id} hidden/>
        <input type="text" name="category_name" defaultValue={data?.name} disabled={isDisabled}/>
        {isDisabled ?<button type="button" onClick={() => handleClick()}>
          <EditIcon/>
        </button> : <button type="submit" onClick={() => handleClick()}>
          <ValidIcon/>
        </button>}
        
        
      </patchCategory.Form>
      <deleteCategory.Form method="DELETE" action="/api/categories">
        <input type="text" name="category_id" value={data.id} hidden/>
        <button type="submit">
          <DeleteIcon/>
        </button>
      </deleteCategory.Form>
    </div>
  )
}