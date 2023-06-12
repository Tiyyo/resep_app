import { useFetcher } from "@remix-run/react";
import DeleteIcon from "~/assets/icons/DeleteIcon";
import EditIcon from "~/assets/icons/EditIcon";
import { addUnit } from "~/helpers/addUnit";
import { capitalize } from "~/helpers/capitalize";
import type { TableBodyProps, TableProps } from "./interface";

export default function Table({
  data,
  endpoint,
  isMultiData,
}: TableProps) {
  const keys = Object.keys(data[0]);


  return (
    <div className="w-fit mx-auto bg-main-300 my-8">
      <div className="h-5 w-full rounded-t-2xl bg-secondary-300">
        {/* head color banner */}
      </div>
      <table className="bg-main-300 table-auto">
        <TableHead keys={keys} />
        {data.length === 1 ? (
          <TableBody data={data[0]} keys={keys} endpoint={endpoint ? endpoint : ""} isMultiData={isMultiData ?? false}/>
        ) : (
          <TableBody data={data} keys={keys} endpoint={endpoint ? endpoint : ""} isMultiData={isMultiData ?? false}/>
        )}
      </table>
    </div>
  );
}

function TableHead({ keys }: { keys: Array<string> }) {
  return (
    <thead className="">
      <tr className="bg-main-300">
        {keys && keys.length > 0 ? (
          <>
            {keys.map((k) => {
              return (
                <th scope="col" key={k} className="px-4 py-2 text-left">
                  {capitalize(k) + addUnit(k)}
                </th>
              );
            })}
          </>
        ) : null}
        <th className="px-4 py-2">Actions</th>
      </tr>
    </thead>
  );
}

function TableBody({
  data,
  keys,
  endpoint,
  isMultiData
}: TableBodyProps) {
  const deleteItem = useFetcher();

  return (
    <tbody>
      {data && data.length ? (
        <>
          {data.map((d) => {
            return (
              <tr
                key={d.id}
                className="even:bg-main-300 odd:bg-primary-300 text-8"
              >
                {keys.map((k) => {
                  return (
                    <td key={d.id + k} className="px-4 py-1">
                      {typeof d[k] === "object" ? (
                        <>{d[k].map((el: string) => el).join(" ")}</>
                      ) : (
                        d[k]
                      )}
                    </td>
                  );
                })}
                <td className="text-right px-4 py-2">
                  <div className="flex gap-x-2">
                    <div className="">
                      <EditIcon size="4" />
                    </div>
                    <deleteItem.Form method="DELETE" action={endpoint ? endpoint : ""} >
                      <button type="submit" name="id" value={d.id}>
                        <DeleteIcon size="4" />
                      </button>
                    </deleteItem.Form>
                  </div>
                </td>
              </tr>
            );
          })}
        </>
      ) : (
        <tr>Database doesn't contain any items</tr>
      )}
    </tbody>
  );
}
