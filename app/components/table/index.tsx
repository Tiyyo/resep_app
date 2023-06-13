import { Link, useFetcher, useLocation } from "@remix-run/react";
import DeleteIcon from "~/assets/icons/DeleteIcon";
import EditIcon from "~/assets/icons/EditIcon";
import { addUnit } from "~/helpers/addUnit";
import { capitalize } from "~/helpers/capitalize";
import type { TableBodyProps, TableProps } from "./interface";
import { useState } from "react";

export default function Table({
  data,
  endpoint,
  isMultiData,
  search,
  image
}: TableProps) {
  const keys = Object.keys(data[0]);
  const [searchParams, setSearchParams] = useState<{
    fields: string;
    value: string;
  }>();

  const filterData = data.filter((f) => {
    if (searchParams?.fields) {
      return f[searchParams.fields].includes(searchParams.value)
    } else {
      return f
    }
  });


  return (
    <div className="w-fit mx-auto bg-main-300 my-8">
      <div className="h-5 w-full rounded-t-2xl bg-secondary-300">
        {/* head color banner */}
      </div>
      <table className="bg-main-300 table-auto">
        <TableHead
          keys={keys}
          search={search ?? undefined}
          getSearchParams={setSearchParams}
        />
        {data.length === 1 ? (
          <TableBody
            data={data[0]}
            keys={keys}
            image={image ?? false}
            endpoint={endpoint ? endpoint : ""}
            isMultiData={isMultiData ?? false}
          />
        ) : (
          <TableBody
            data={filterData}
            keys={keys}
            image={image ?? false}
            endpoint={endpoint ? endpoint : ""}
            isMultiData={isMultiData ?? false}
          />
        )}
      </table>
    </div>
  );
}

// find right type for setState


function activateSearch(
  arg: string,
  search: string | undefined,
  setState: any
) {
  if (!search) {
    return (
      <th scope="col" key={arg} className="px-4 py-2 text-left">
        {capitalize(arg).replace('-' , ' ') + addUnit(arg)}
      </th>
    );
  }
  if (arg.toLowerCase() !== search.toLowerCase()) {
    return (
      <th scope="col" key={arg} className="px-4 py-2 text-left">
        {capitalize(arg).replace('-' , ' ') + addUnit(arg)}
      </th>
    );
  } else {
    return (
      <th scope="col" key={arg} className="px-4 py-2 text-left">
        <div className="flex gap-x-2">
          {capitalize(arg).replace('_' , ' ') + addUnit(arg)}
          <input
            type="text"
            className="rounded-md bg-primary-100 text-7"
            onChange={(e) =>
              setState({ fields: search, value: e.target.value })
            }
          />
        </div>
      </th>
    );
  }
}

function TableHead({
  keys,
  search,
  getSearchParams,
}: {
  keys: Array<string>;
  search: string | undefined;
  getSearchParams: any;
}) {
  // const [searchParams,setSearchParams] = useState<{fields : string , value : string}>()

  return (
    <thead className="">
      <tr className="bg-main-300">
        {keys && keys.length > 0 ? (
          <>{keys.map((k) => activateSearch(k, search, getSearchParams))}</>
        ) : null}
        <th className="px-4 py-2">Actions</th>
      </tr>
    </thead>
  );
}

// display image instead , image props should be set to true and a field should be name "image"
function displayImageCells (key : string , d : any, image : boolean) : string | JSX.Element {
    if (key.toLowerCase() === "image" && image) {
      return (<div className="rounded-full overflow-hidden h-6 aspect-square">
        <img src={d.image} alt="icon of an ingredient"/>
      </div>)
    } 
    return d[key]
}


function TableBody({ data, keys, endpoint, image }: TableBodyProps) {
  const deleteItem = useFetcher();
  const location = useLocation()

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
                          displayImageCells(k, d, image)
                      )}
                    </td>
                  );
                })}
                <td className="text-right px-4 py-2">
                  <div className="flex gap-x-2">
                    <div className="" >
                      <Link to={location.pathname + "/update/" + d.id}>
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
    </tbody>
  );
}
