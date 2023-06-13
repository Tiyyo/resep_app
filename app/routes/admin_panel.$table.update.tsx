import type { LoaderArgs } from "@remix-run/node";
import { useOutletContext } from "@remix-run/react";

export async function loader ({request} : LoaderArgs) {
  return null
}

export default function () {
  const dataFromOutlet = useOutletContext()
  console.log(dataFromOutlet);
  return (
    <div className="h-16 w-44 border border-gray-950 ">
      Modal Edit Form
    </div>
  );
}