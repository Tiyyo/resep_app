import { useFetcher } from "@remix-run/react";
import Input from "../input";
import SubmitButton from "../submit_button";

export default function UpdateCategoriesForm({ data: category }) {
    const updateCategory = useFetcher();
    return (
      <updateCategory.Form method="PATCH" action="/api/categories">
        <div className="flex justify-center gap-x-3">
          <input type="text" name="id" defaultValue={category.id} hidden />
          <Input
            name="category"
            placeholder="Category name"
            defaultValue={category.name}
          />
          <SubmitButton text="Edit Category" />
        </div>
      </updateCategory.Form>
    );
  }