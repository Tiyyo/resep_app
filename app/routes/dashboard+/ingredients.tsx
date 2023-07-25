import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Outlet,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { promiseHash } from "remix-utils";
import category from "~/api/category";
import icon from "~/api/icon";
import ingredient from "~/api/ingredient";
import macro from "~/api/macro";
import OrientationScreen from "~/components/orientation";
import Table from "~/components/table";
import Error404 from "~/layout/Error404Page";

export async function loader({ request }: LoaderArgs) {
  return json(
    await promiseHash({
      categories: category.findAll(),
      macros: macro.findAll(),
      icons: icon.findAll(),
      ingredients: ingredient.findAll(),
    })
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
      unit_weight: ingr.unit_weight ?? "",
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
      <OrientationScreen />
      <div className="hidden xl:block">
        <Outlet />
        {ingredients && (
          <Table
            data={dataIngr}
            image={true}
            search="name"
            endpoint="/api/ingredients"
          />
        )}
      </div>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (!isRouteErrorResponse(error)) {
    return (
      <div className="center h-full w-full flex-col">
        <p className="text-10 font-semibold">
          We are sorry ... something went wrong with thoses ingredients
        </p>
        <p>
          &#8608; &#8608; <Link to="/dashboard">Click here to refresh</Link>{" "}
          &#8606; &#8606;
        </p>
        ;
      </div>
    );
  }

  if (error.status === 404) {
    return <Error404 />;
  }
}
