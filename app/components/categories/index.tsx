import { useFetcher } from "@remix-run/react";
import { useState } from "react";
import DeleteIcon from "~/assets/icons/DeleteIcon";
import EditIcon from "~/assets/icons/EditIcon";
import ValidIcon from "~/assets/icons/ValidIcon";
import type { Category } from "./interface";

export default function Categories({ data }: { data: Category }) {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const deleteCategory = useFetcher();
  const patchCategory = useFetcher();

  const handleClick = (e?: any): void => {
    if (patchCategory.state === "idle") setIsDisabled(!isDisabled);
  };

  return (
    <div className="flex flex-nowrap gap-x-2">
      <patchCategory.Form method="PATCH" action="/api/categories">
        <label htmlFor="name"></label>
        <input type="text" name="category_id" defaultValue={data.id} hidden />
        <input
          type="text"
          name="category_name"
          defaultValue={data?.name}
          disabled={isDisabled}
        />
        <button type="button" onClick={() => handleClick()}>
          <EditIcon />
        </button>
        <button type="submit" disabled={isDisabled}>
          <ValidIcon />
        </button>
      </patchCategory.Form>
      <deleteCategory.Form method="DELETE" action="/api/categories">
        <input type="text" name="category_id" defaultValue={data.id} hidden />
        <button type="submit">
          <DeleteIcon />
        </button>
      </deleteCategory.Form>
    </div>
  );
}
