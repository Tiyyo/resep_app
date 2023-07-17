import { useFetcher } from "@remix-run/react";
import { useState } from "react";
import SubmitButton from "../submit_button";
import Input from "../input";

export default function Intro({ action }: { action: "new" | "old" | null }) {
  //   const [userHasChosen, setUserHasChosen] = useState<"new" | "old" | null>(
  //     null
  //   );
  const fetchRandomRecipes = useFetcher();

  if (action === "new") {
    return (
      <fetchRandomRecipes.Form
        className="center flex-col gap-y-8"
        // onSubmit={handleClickGenerate}
        method="POST"
      >
        <p className="text-12 font-semibold text-text-accent_soft">
          How many meals do you want to prepare ?
        </p>
        <Input type="number" name="numRecipes" width="16" />
        <SubmitButton text="Let's Go" name="action" value="getRandom" />
      </fetchRandomRecipes.Form>
    );
  }
  //   return (
  //     <div className=" center w-full">
  //       {/* <button
  //         type="button"
  //         className="bg-secondary-300 text-10 font-semibold text-white-200 py-2 px-6 w-[150px]"
  //       >
  //         I want to generate a new random set of recipes
  //       </button>
  //       <button type="button">I want to load the last set i used</button> */}
  //     </div>
  //   );
}

{
  /* <fetchRandomRecipes.Form
className="center flex-col gap-y-8"
// onSubmit={handleClickGenerate}
method="POST"
>
<p className="text-12 font-semibold text-text-accent_soft">
  How many meals do you want to prepare ?
</p>
<Input type="number" name="numRecipes" width="16" />
<SubmitButton text="Let's Go" name="action" value="getRandom" />
</fetchRandomRecipes.Form> */
}
