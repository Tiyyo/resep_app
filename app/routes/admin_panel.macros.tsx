import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, isRouteErrorResponse, useFetcher, useLoaderData, useRouteError } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { getMacros } from "~/api/get.all.request";
import Input from "~/components/input";
import SubmitButton from "~/components/submit_button";
import Table from "~/components/table";

export async function loader({ request }: LoaderArgs) {
  const macros = await getMacros();
  return json({macros})
}

export default function MacrosPanel() {
  const { macros } = useLoaderData();
  const addMacros = useFetcher();
  const [errorText, setErrorText] = useState<string>("")

  const addMacroFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (
      addMacros.state === "idle" &&
      addMacroFormRef &&
      addMacroFormRef.current
    ) {
      addMacroFormRef.current.reset();
      setErrorText(addMacros?.data?.fields?.name)
    }
  }, [addMacros.state, addMacros?.data?.fields?.name]);

  return (
    <div className="pt-5">
      <addMacros.Form method="POST" action="/api/macros" ref={addMacroFormRef}>
        <div className="flex center gap-x-4">
          <Input label="Food" name="food" type="text" unit="" width="25" />
          <Input label="Calories" unit="g" type="number" name="calories" width="12" />
          <Input label="Proteins" unit="g" type="number" name="proteins" width="12"/>
          <Input label="Carbs" unit="g" type="number" name="carbs" width="12"/>
          <Input label="Fat" unit="g" type="number" name="fat" width="12"/>
          <Input label="Water" unit="ml" type="number" name="water" width="12"/>
          <SubmitButton text="Add food"/>
        </div>
      </addMacros.Form>
      <div>
        {macros && macros.length > 0 ? (
          <Table data={macros} endpoint="/api/macros" search="food"/>
        ) : (
          "No macro nutriment in database"
        )}
      </div>
    </div>
  );
}

// function Row() {
//   return;
// }

// function Table({ data }) {
//   const [searchValue, setSearchValue] = useState<string>("");
//   const editMacro = useFetcher();
//   const deleteMacro = useFetcher();

//   return (
//     <div>
//       <div>
//         <label>Seach</label>
//         <input type="text" onChange={(e) => setSearchValue(e.target.value)} />
//       </div>

//       {/* {data ? (
//         <>
//           {data
//             .filter((f) => f.food.includes(searchValue))
//             .map((el) => {
//               return (
//                 <div key={el.id} className="flex">
//                   <editMacro.Form action="/api/macros" method="PATCH" className="flex">
//                     <input
//                       type="text"
//                       name={"id"}
//                       defaultValue={el.id}
//                       hidden
//                     />
//                     <Input
//                       label="Food"
//                       name="food"
//                       type="text"
//                       unit=""
//                       width="25"
//                       defaultValue={el.food}
//                     />
//                     <Input
//                       label="Calories"
//                       unit="g"
//                       type="number"
//                       name="calories"
//                       defaultValue={el.calories}
//                     />
//                     <Input
//                       label="Proteins"
//                       unit="g"
//                       type="number"
//                       name="proteins"
//                       defaultValue={el.proteins}
//                     />
//                     <Input
//                       label="Carbs"
//                       unit="g"
//                       type="number"
//                       name="carbs"
//                       defaultValue={el.carbs}
//                     />
//                     <Input
//                       label="Fat"
//                       unit="g"
//                       type="number"
//                       name="fat"
//                       defaultValue={el.fat}
//                     />
//                     <Input
//                       label="Water"
//                       unit="g"
//                       type="number"
//                       name="water"
//                       defaultValue={el.water}
//                       step={0.1}
//                     />
//                     <button type="submit">Valid Edit</button>
//                   </editMacro.Form>
//                   <deleteMacro.Form action="/api/macros" method="DELETE"> 
//                     <input type="number" name="id" defaultValue={el.id} hidden />
//                     <button type="submit">
//                       <DeleteIcon/>
//                     </button>
//                   </deleteMacro.Form>

//                 </div>
//               );
//             })}
//         </>
//       ) : (
//         ""
//       )} */}
//     </div>
//   );
// }

export function ErrorBoundary() {
  const error = useRouteError();

  console.log(error);

  if (!isRouteErrorResponse(error)) {
    return (<Link to="/admin_panel/macros">Refresh</Link>);
  }

  if (error.status === 404) {
    return (
      <>
        <h2>Error 404</h2>
        <button> Rafraichir </button>
      </>
    );
  }
}
