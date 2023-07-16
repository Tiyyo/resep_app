import { Link, useFetcher, useLocation } from "@remix-run/react";
import { TableBodyProps } from "./interface";
import EditIcon from "~/assets/icons/EditIcon";
import DeleteIcon from "~/assets/icons/DeleteIcon";
import { displayMultiString } from "./display.multi.string";
import { displayContentToCells } from "./display.content.cells";
import { Toast } from "../toast";

export default function TableBody({
  data,
  keys,
  endpoint,
  image,
  search,
}: TableBodyProps) {
  const deleteItem = useFetcher();
  const location = useLocation();

  function extractEntityNameFromUrl(url: string): string {
    const urlParts = url.split("/");
    urlParts.shift();
    const startUpdateUrl = urlParts
      .map((p, index) => {
        if (index === urlParts.length - 1) return "update/" + p;
        return p;
      })
      .join("/");
    return startUpdateUrl;
  }

  return (
    <tbody>
      {data && data.length ? (
        <>
          {data.map((d) => {
            if (search && !d[search]) return null;
            return (
              <tr
                key={d.id}
                className="even:bg-white-100 odd:bg-primary-300 text-8"
              >
                {keys.map((k) => {
                  return (
                    <td key={d.id + k} className="px-4 py-1">
                      {typeof d[k] === "object" ? (
                        <>{displayMultiString(d[k])}</>
                      ) : (
                        displayContentToCells(k, d, image)
                      )}
                    </td>
                  );
                })}
                <td className="text-right px-4 py-2">
                  <div className="flex gap-x-2">
                    <div className="">
                      <Link
                        to={
                          "/" +
                          extractEntityNameFromUrl(location.pathname) +
                          "/" +
                          d.id
                        }
                      >
                        <EditIcon size="5" />
                      </Link>
                    </div>
                    <deleteItem.Form
                      method="DELETE"
                      action={endpoint ? endpoint : ""}
                    >
                      <button type="submit" name="id" value={d.id}>
                        <DeleteIcon size="5" />
                      </button>
                    </deleteItem.Form>
                  </div>
                </td>
              </tr>
            );
          })}
        </>
      ) : (
        <tr className="">
          <td colSpan={keys.length + 1} className="py-4 text-center">
            Database doesn't contain any items
          </td>
        </tr>
      )}
      <Toast message={deleteItem?.data?.message} />
    </tbody>
  );
}
