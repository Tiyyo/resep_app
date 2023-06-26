import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getCategories } from "~/api/get.all.request";
import Table from "~/components/table";

export async function loader({ request }: LoaderArgs) {
  const categories = await getCategories();
  return json({ categories });
}

export default function CategoryPanel() {
  const { categories } = useLoaderData();

  return (
    <>
      <Outlet />
      <div className="overflow-y-scroll flex flex-col gap-y-4 pt-5 ">
        {categories && <Table data={categories} endpoint="/api/categories" />}
      </div>
    </>
  );
}
