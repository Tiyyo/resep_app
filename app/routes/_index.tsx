import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  NavLink,
  Outlet,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import LayoutPage from "~/components/layout/LayoutPage";
import { getUser, isAdmin, requireUserId } from "~/utils/auth.server";
import { getProfile } from "~/utils/get.user.infos";

export async function loader({ request }: LoaderArgs) {
  await requireUserId(request);
  const admin = await isAdmin(request);
  const profile = await getProfile(request);
  return json({ admin, profile });
}

export const meta: V2_MetaFunction = () => {
  return [{ title: "Groc ! Have control over your macros" }];
};

export default function Index() {
  const { admin, profile } = useLoaderData<typeof loader>();
  console.log(profile);

  return (
    <LayoutPage>
      <div className="grid grid-cols-main  grid-rows-main min-h-screen">
        <div className="absolute top-6 right-6 border-2 border-secondary-400 rounded-custom-50
        ">

        </div>
        <div className="col-start-2 border-2 border-pink-900">
          <nav className="bg-white-100 text-text-accent center gap-x-8 py-2.5 px-3 rounded-full text-10 font-semibold w-fit">
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/recipes">Recipes</NavLink>
            <NavLink to="groceries">Groceries</NavLink>
            {admin ? <NavLink to="/dashboard">Admin Panel</NavLink> : ""}
          </nav>
        </div>
        <div className="">{/* info location */}</div>
        <div className="border-2">{/*side menu*/}</div>
        <div className="row-start-2 row-end-4 col-start-2 col-end-3">
          <Outlet />
          {/* Outlet */}
        </div>
      </div>
    </LayoutPage>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (!isRouteErrorResponse(error)) {
    return <p> An Error occured</p>;
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
