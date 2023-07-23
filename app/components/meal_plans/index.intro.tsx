import { useFetcher } from "@remix-run/react";
import { useState } from "react";
import SubmitButton from "../submit_button";
import Input from "../input";
import Error from "../error";

export default function Intro({ action }: { action: "new" | "old" | null }) {
  const fetchRandomRecipes = useFetcher();

  if (action === "new") {
    return (
      <fetchRandomRecipes.Form
        className="center flex-col gap-y-8"
        method="POST"
      >
        <p className="text-12 font-semibold text-text-accent_soft">
          How many meals do you want to prepare ?
        </p>
        <Input type="number" name="numRecipes" width="16" />
        {fetchRandomRecipes && (
          <Error message={fetchRandomRecipes?.data?.error?.numRecipes} />
        )}
        <SubmitButton text="Let's Go" name="action" value="getRandom" />
      </fetchRandomRecipes.Form>
    );
  }
  return <></>;
}
