import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { promiseHash } from 'remix-utils';
import category from '~/api/category';
import icon from '~/api/icon';
import ingredient from '~/api/ingredient';
import macro from '~/api/macro';
import Table from '~/components/table';

export async function loader({ request }: LoaderArgs) {
  return json(
    await promiseHash({
      categories: category.findAll(),
      macros: macro.findAll(),
      icons: icon.findAll(),
      ingredients: ingredient.findAll(),
    }),
  );
}

export default function () {
  // can't type useLoaderData bugs still not fixed
  // convert type to Serialize object
  const { ingredients } = useLoaderData();

  // change location to an execution on server
  // add type
  const dataIngr = ingredients.map((ingr: any) => {
    return {
      id: ingr.id,
      image: ingr.icon?.link,
      name: ingr.name,
      unit_weight: ingr.unit_weight ?? '',
      category: ingr.category.name,
      calories: ingr.macros?.calories,
      proteins: ingr.macros?.proteins,
      carbs: ingr.macros?.carbs,
      fat: ingr.macros?.fat,
      water: ingr.macros?.water,
    };
  });

  return (
    <>
      <Outlet />
      {ingredients && (
        <Table
          data={dataIngr}
          image={true}
          search="name"
          endpoint="/api/ingredients"
        />
      )}
    </>
  );
}
