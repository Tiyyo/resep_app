import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {  useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { getCategories } from "~/api/get.all.request";
import Categories from "~/components/categories";
import { FormField } from "~/components/form_field";

export async function loader ({request} : LoaderArgs) {
    const categories = await getCategories()
    return json({categories})
}


export default function CategoryPanel() {
    const {categories} = useLoaderData<typeof loader>()
    const addCategory = useFetcher()
    const [errorText, setErrorText] = useState("")

    const addFormState = addCategory.state
    const addFormRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
      if(addCategory.type === 'done' && addFormRef && addFormRef.current ) {
        addFormRef.current.reset();
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

      {categories.length > 0 ? <div className="grid grid-cols-250 place-items-center gap-4 ">
        {categories.map((c) => <Categories key={c.id} data={c}/>)}
      </div> :  <p>Database doesn't contain any categories</p>}
    </div>
  );
}

