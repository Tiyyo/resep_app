import { LoaderArgs, redirect } from "@remix-run/node";

export async function loader(request:LoaderArgs) {
  return redirect('/admin_panel/ingredients')
}

export default function Panel() {
  return ;
}