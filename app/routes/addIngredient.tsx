import { Form, useLoaderData } from "@remix-run/react";
import { LoaderArgs } from "@remix-run/node";
import type { ActionArgs, redirect } from "@remix-run/node"
import {  getCategories } from "../api/get.ingredient.categories";
import { getUnitMeasures } from "~/api/get.unit_measures";
import { getUnitComputes } from "~/api/get.unit_computes";





export async function loader(arg: LoaderArgs) {
  const categories = await getCategories();
  const unitMeasures = await getUnitMeasures();
  const unitComputes = await getUnitComputes()
  return {categories, unitMeasures, unitComputes} 

}
export async function action({ request }: ActionArgs) {
    const formData = await request.formData();
    // const genderName = formData.get('gender') as string
    // await postGender(genderName)
  
  return null
};

export default function addIngredient() {
  const {categories , unitMeasures, unitComputes} = useLoaderData<typeof loader>();

  interface Category  {
    id : number;
    category_name : string;
  }   

  interface UnitMeasures  {
    id : number;
    abreviation : string;
    name : string ;
}

interface UnitComputes  {
    id : number;
    name : string ;
    abreviation : string;
    category_name : string;
  }

  return (
    <div className="min-h-screen bg-primary-100">
        <div className="border-2 w-full bg-primary-300 h-4">

        </div>
      {/* <Form method="post">
        <select name="gender" className="select select-bordered">
          <option value="men">Men</option>
          <option value="women">Women</option>
        </select>
        <button type="submit" className="btn btn-sm">
          Submit
        </button>
      </Form> */}

      {/* <Form method="post" >
        <input type="text" placeholder="name" name="name" className="input input-bordered w-full max-w-xs" />
        <label htmlFor="">Belong to ?</label>
        <input type="text" name="name" className="h-6 w-6" />
        <div className="form-control w-full max-w-xs">
          <select className="select select-bordered" name="category">
            {categories.map((c : Category) => (<option key={c.id}>{c.category_name}</option>))}
          </select>
        </div>
        <div className="form-control w-full max-w-xs">
          <select className="select select-bordered" name="unitMeasures">
            {unitMeasures.map((unit : UnitMeasures) => (
               <option key={unit.id}>{unit.abreviation}</option>

            ))}
          </select>
        </div>
        <div className="form-control w-full max-w-xs">
          <select className="select select-bordered" name="unitComputes">
            {unitComputes.map((unit : UnitComputes) => (
               <option key={unit.id}>{unit.abreviation}</option>

            ))}
          </select>
        </div>
        <input type="number" placeholder="average unit weight" className="input input-bordered w-full max-w-xs" name="unitWeight"/>
        <input type="number" placeholder="average portion" className="input input-bordered w-full max-w-xs" name="usualPortion"/>
        <button type="submit" className="btn btn-sm">Add</button>
      </Form> */}
    </div>
  );
}
