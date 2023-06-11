import { useFetcher } from "@remix-run/react";
import DeleteIcon from "~/assets/icons/DeleteIcon";
import EditIcon from "~/assets/icons/EditIcon";

export default function Table({
  data,
  endpoint,
}: {
  data: Array<any>;
  endpoint: string;
}) {
  const keys = Object.keys(data[0]);
  return (
    <div className="w-fit mx-auto bg-main-300">
      <div className="h-5 w-full rounded-t-2xl bg-secondary-300">
        {/* head color banner */}
      </div>
      <table className="bg-main-300" >
        <TableHead keys={keys} />
        <TableBody data={data} keys={keys} endpoint={endpoint} />
      </table>
    </ div>
  );
}

function TableHead({ keys }: { keys: Array<string> }) {
  return (
    <thead className="flex justify-between even:bg-main-300 odd:bg-primary-300 text-8">
      <tr className="bg-main-300">
        {keys && keys.length > 0 ? (
          <>
            {keys.map((k) => {
              return (
                <th key={k} className="flex-grow-1 px-4 py-2">
                  {k.toUpperCase()}
                </th>
              );
            })}
          </>
        ) : null}
        <th className="basis-1/12 flex-grow-0 px-4 py-2">ACTIONS</th>
      </tr>
    </thead>
  );
}

function TableBody({
  data,
  keys,
  endpoint,
}: {
  data: Array<any>;
  keys: Array<string>;
  endpoint: string;
}) {
  const deleteItem = useFetcher();

  return (
    <tbody>
      {data && data.length ? (
        <>
          {data.map((d) => {
            return (
              <tr key={d.id} className="flex even:bg-main-300 odd:bg-primary-300 text-8">
                {keys.map((k) => {
                  return (
                    <td key={d.id + k} className="flex-grow-1 px-4 py-2">
                      {d[k]}
                    </td>
                  );
                })}
                <td className="flex gap-x-4 basis-1/12 flex-grow-0 px-4 py-2">
                  <div className="">
                    <EditIcon size="4" />
                  </div>
                  <deleteItem.Form method="DELETE" action={endpoint}>
                    <button type="submit" name="category_id" value={d.id}>
                      <DeleteIcon size="4" />
                    </button>
                  </deleteItem.Form>
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
