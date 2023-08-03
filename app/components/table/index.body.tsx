import { Link, useFetcher, useLocation } from "@remix-run/react";
import type { TableBodyProps } from "./interface";
import EditIcon from "~/assets/icons/EditIcon";
import DeleteIcon from "~/assets/icons/DeleteIcon";
import { displayMultiString } from "./display.multi.string";
import { displayContentToCells } from "./display.content.cells";
import { Toast } from "../toast";
import { extractEntityNameFromUrl } from "./extract.name.from.url";
import { useEffect, useState } from "react";

export default function TableBody({
  data,
  keys,
  endpoint,
  image,
  search,
}: TableBodyProps) {
  const [deleteMessage, setDeleteMessage] = useState<string>();
  const deleteItem = useFetcher();
  const location = useLocation();

  useEffect(() => {
    if (deleteItem?.data?.message) {
      setDeleteMessage(deleteItem?.data?.message);
    }
    if (deleteItem?.data?.error?.userMessage) {
      setDeleteMessage(deleteItem?.data?.error?.userMessage);
    }
  }, [deleteItem?.data?.message, deleteItem?.data?.error?.userMessage]);

  return (
    <tbody>
      {data && data.length ? (
        <>
          {data.map((d) => {
            if (search && !d[search]) return null;
            return (
              <tr
                key={d.id}
                className="text-8 odd:bg-primary-300 even:bg-white-100"
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
                <td className="px-4 py-2 text-right">
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
        <tr>
          <td colSpan={keys.length + 1} className="py-4 text-center">
            Database doesn't contain any items
          </td>
        </tr>
      )}
      <Toast message={deleteMessage} />
    </tbody>
  );
}
