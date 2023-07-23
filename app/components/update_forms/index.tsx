import { Form, useFetcher } from "@remix-run/react";
import Input from "../input";
import SubmitButton from "../submit_button";
import FileInput from "../file_input";
import SelectSearch from "../select_search";
import Error from "../error";

// export default function UpdateMacrosForm({ data: macros }) {
//   const updateMacros = useFetcher();
//   return (
//     <updateMacros.Form method="PATCH" action="/api/macros">
//       <div className="flex flex-col center gap-y-12">
//         <input type="text" name="id" defaultValue={macros.id} hidden />

//         <Input
//           label="Food"
//           name="food"
//           type="text"
//           unit=""
//           width="25"
//           defaultValue={macros.food}
//         />

//         <div className="flex flex-col justify-start">
//           <Input
//             label="Calories"
//             unit="g"
//             type="number"
//             name="calories"
//             width="14"
//             defaultValue={macros.calories}
//           />
//           <Error message={updateMacros?.data?.fieldErrors?.calories} />
//         </div>

//         <div className="flex items-start gap-x-4">
//           <div className="flex flex-col justify-start">
//             <Input
//               label="Proteins"
//               unit="g"
//               type="number"
//               name="proteins"
//               width="14"
//               defaultValue={macros.proteins}
//             />
//             <Error message={updateMacros?.data?.fieldErrors?.proteins} />
//           </div>

//           <div className="flex flex-col justify-start">
//             <Input
//               label="Carbs"
//               unit="g"
//               type="number"
//               name="carbs"
//               width="14"
//               defaultValue={macros.carbs}
//             />
//             <Error message={updateMacros?.data?.fieldErrors?.carbs} />
//           </div>
//           <div className="flex flex-col justify-start">
//             <Input
//               label="Fat"
//               unit="g"
//               type="number"
//               name="fat"
//               width="14"
//               defaultValue={macros.fat}
//             />
//             <Error message={updateMacros?.data?.fieldErrors?.fat} />
//           </div>

//           <div className="flex flex-col justify-start">
//             <Input
//               label="Water"
//               unit="ml"
//               type="number"
//               name="water"
//               width="14"
//               defaultValue={macros.water}
//             />
//             <Error message={updateMacros?.data?.fieldErrors?.water} />
//           </div>
//         </div>
//         <SubmitButton text="Edit food" />
//       </div>
//     </updateMacros.Form>
//   );
// }

// export function UpdateCategoriesForm({ data: category }) {
//   const updateCategory = useFetcher();
//   return (
//     <updateCategory.Form method="PATCH" action="/api/categories">
//       <div className="flex justify-center gap-x-3">
//         <input type="text" name="id" defaultValue={category.id} hidden />
//         <Input
//           name="category"
//           placeholder="Category name"
//           defaultValue={category.name}
//         />
//         <SubmitButton text="Edit Category" />
//       </div>
//     </updateCategory.Form>
//   );
// }
