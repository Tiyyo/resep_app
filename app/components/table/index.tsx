import { Link, useFetcher, useLocation } from "@remix-run/react";
import DeleteIcon from "~/assets/icons/DeleteIcon";
import EditIcon from "~/assets/icons/EditIcon";
import { addUnit } from "~/utils/add.unit";
import { capitalize } from "~/utils/capitalize";
import type { TableBodyProps, TableProps } from "./interface";
import { useState } from "react";

const numericFields = ["calories", "proteins", "carbs", "fat", "water"];

export default function Table({
  data,
  endpoint,
  isMultiData,
  search,
  image,
}: TableProps) {
  const [searchParams, setSearchParams] = useState<{
    fields: string;
    value: string;
  }>();

  if (data.length < 1) {
    return <div className="w-full h-full center"><p>Database is Empty</p></div>;
  }


  const keys = Object.keys(data[0]) ?? "";

  const filterData = data.filter((f) => {

    if (searchParams?.fields && f[searchParams.fields] ) {
      return f[searchParams.fields].includes(searchParams.value);
    } else {
      return f;
    }
  });

  return (
    <div className="w-full mx-auto ">
      <table className="bg-main-300 table-auto mx-auto">
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
            search={search ?? undefined}
          />
        ) : (
          <TableBody
            data={filterData}
            keys={keys}
            image={image ?? false}
            endpoint={endpoint ? endpoint : ""}
            isMultiData={isMultiData ?? false}
            search={search ?? undefined}
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
        {capitalize(arg).replace("-", " ") + addUnit(arg)}
      </th>
    );
  }
  if (arg.toLowerCase() !== search.toLowerCase()) {
    return (
      <th scope="col" key={arg} className="px-4 py-2 text-left">
        {capitalize(arg).replace("-", " ") + addUnit(arg)}
      </th>
    );
  } else {
    return (
      <th scope="col" key={arg} className="px-4 py-2 text-left">
        <div className="flex gap-x-2">
          {capitalize(arg).replace("_", " ") + addUnit(arg)}
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
      <tr className="bg-secondary-100">
        {keys && keys.length > 0 ? (
          <>{keys.map((k) => activateSearch(k, search, getSearchParams))}</>
        ) : null}
        <th className="px-4 py-2">Actions</th>
      </tr>
    </thead>
  );
}

// display image instead , image props should be set to true and a field should be name "image"
// fixed float number to 1 decimal 
function displayContentToCells(
  key: string,
  d: any,
  image: boolean
): string | JSX.Element {
  if (key.toLowerCase() === "image" && image) {
    return (
      <div className="rounded-full overflow-hidden h-6 aspect-square">
        <img src={d.image} alt="icon of an ingredient object-center" />
      </div>
    );
  }
  if(numericFields.includes(key.toLowerCase())){
      return isNaN(Number(d[key])) ? d[key] : Number(d[key]).toFixed(1)  
  }
  return d[key];
}

function displayMultiString(content: Array<string>) {
  return content.map((el: string) => el).join(" ")
}



function TableBody({ data, keys, endpoint, image, search }: TableBodyProps) {
  const deleteItem = useFetcher();
  const location = useLocation();

  return (
    <tbody>
      {data && data.length ? (
        <>
          {data.map((d) => {
            if( search && !d[search]) return null
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
