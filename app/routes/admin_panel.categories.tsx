import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {  useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { getCategories } from "~/api/get.all.request";
import Categories from "~/components/categories";
import Error from "~/components/error";
import Input from "~/components/input";
import SubmitButton from "~/components/submit_button";

export async function loader ({request} : LoaderArgs) {
      const categories = await getCategories()
      return json({categories})
}


export default function CategoryPanel() {
    const {categories} = useLoaderData<typeof loader>()
    const addCategory = useFetcher()
    const [errorText, setErrorText] = useState<string>("")

    const addFormState = addCategory.state
    const addFormRef = useRef<HTMLFormElement>(null)


    useEffect(() => {
      if(addCategory.state === 'idle' && addFormRef && addFormRef.current ) {
        addFormRef.current.reset();
        setErrorText(addCategory?.data?.fields?.name)
      }
    }, [addFormState, addCategory.state, addCategory?.data?.fields?.name])

  return (
    <div className="overflow-y-scroll flex flex-col gap-y-4 pt-5 ">
      <addCategory.Form method="post" action="/api/categories" ref={addFormRef}>
        <div className="flex justify-center gap-x-3">
          <Input name="category" placeholder="Category name"/>
          <SubmitButton text="Add Category"/>
        </div>
      </addCategory.Form>
      <Error message={errorText}/>

      {categories && categories.length > 0 ? <div className="grid grid-cols-250 place-items-center gap-4 ">
        {categories.map((c) => <Categories key={c.id} data={c}/>)}
      </div> :  <p>Database doesn't contain any categories</p>}
    </div>
  );
}

