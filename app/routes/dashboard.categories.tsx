import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getCategories } from "~/api/get.all.request";
import Table from "~/components/table";
import { UpdateCategoriesForm } from "~/components/update_forms";

export async function loader({ request }: LoaderArgs) {
  const categories = await getCategories();
  return json({ categories });
}

export default function CategoryPanel() {
  const { categories } = useLoaderData();
  return (
    <>
      <Outlet context={{ UpdateForm: UpdateCategoriesForm }} />
      <div className="overflow-y-scroll flex flex-col gap-y-4 pt-5 ">
        <Table data={categories} endpoint="/api/categories" />
      </div>
    </>
  );
}
