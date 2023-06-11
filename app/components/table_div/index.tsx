import { useFetcher } from "@remix-run/react";
import DeleteIcon from "~/assets/icons/DeleteIcon";
import EditIcon from "~/assets/icons/EditIcon";

export default function Table ({data, endpoint} : { data : Array<any> , endpoint : string}) {
    const keys = Object.keys(data[0])
    return (
      <div className="w-fit mx-auto bg-main-300">
          <div className="h-5 w-full rounded-t-2xl bg-secondary-300">
            {/* head color banner */}
          </div>
        <TableHead keys={keys}/>
        <TableBody data={data} keys={keys} endpoint={endpoint}/>
      </div>
    )
  }
  
  function TableHead({ keys }: { keys: Array<string> }) {
    return (
      <div className="flex justify-between even:bg-main-300 odd:bg-primary-300 text-8">
        {keys && keys.length > 0 ? (
          <>
            {keys.map((k) => {
              return (
                <div key={k} className="flex-grow-1 px-4 py-2">
                  {k}
                </div>
              );
            })}
          </>
        ) : (
          null
        )}
        <div className="basis-1/12 flex-grow-0 px-4 py-2">Actions</div>
      </div>
    );
  }
  
  function TableBody ({data, keys, endpoint} : {data :  Array<any>, keys : Array<string>, endpoint : string}) {
    const deleteItem = useFetcher()
  
    return (
      <>
        {data && data.length ? (
          <>
            {data.map((d) => {
              return (
                <div key={d.id} className="flex">
                  {keys.map((k) => {
                    return <div key={d.id + k} className="flex-grow-1 px-4 py-2">{d[k]}</div>;
                  })}
                  <div className="flex gap-x-4 basis-1/12 flex-grow-0 px-4 py-2">
                    <div className="">
                      <EditIcon size="4" />
                    </div>
                    <deleteItem.Form method="DELETE" action={endpoint}>
                      <button type="submit" name="category_id" value={d.id}>
                        <DeleteIcon size="4" />
                      </button>
                    </deleteItem.Form>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <p>Database doesn't contain any items</p>
        )}
      </>
    );
  }