import type { V2_MetaFunction } from "@remix-run/node";

import { Link } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>

      <div className="mx-auto mt-16 max-w-7xl text-center">
        <Link to="/posts" className="text-xl text-blue-600 underline">
          Blog Posts
        </Link>
      </div>
    </div>
  );
}
