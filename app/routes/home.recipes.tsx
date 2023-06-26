import type{ LoaderArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export async function loader({ request } : LoaderArgs) {
  console.log('HOME RECIPES');
  return null;
}

export default function () {

  return <div>
    <Outlet />
    Home to recipes 15</div>;
}
