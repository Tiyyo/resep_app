import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import category from "~/api/category";
import Table from "~/components/table";
import { Toast } from "~/components/toast";

export async function loader({ request }: LoaderArgs) {
  const categories = await category.findAll();
  //   const categories = await category.findAllRaw();
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
