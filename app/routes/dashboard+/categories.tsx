import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import category from "~/api/category";
import Table from "~/components/table";
import NotFoundError from "~/helpers/errors/not.found.error";
import ResponseError from "~/helpers/response/response.error";

export async function loader({ request }: LoaderArgs) {
  try {
    const categories = await category.findAll();
    if (!categories) throw new NotFoundError("No categories found");
    return json({ categories });
  } catch (error) {
    return new ResponseError(error);
  }
}

export default function CategoryPanel() {
  const { categories } = useLoaderData();

  return (
    <>
      <Outlet />
      <div className="flex flex-col gap-y-4 overflow-y-scroll pt-5 ">
        {categories && <Table data={categories} endpoint="/api/categories" />}
      </div>
    </>
  );
}
