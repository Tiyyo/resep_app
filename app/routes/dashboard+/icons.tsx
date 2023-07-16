import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
    Link,
    Outlet,
    isRouteErrorResponse,
    useLoaderData,
    useRouteError,
} from "@remix-run/react";
import icon from "~/api/icon";
import Table from "~/components/table";

export async function loader({ request }: LoaderArgs) {
    const icons = await icon.findAll();
    return json({ icons });
}

export default function EditIcons() {
    // ts errors remix bugs open issue here
    //https://github.com/remix-run/remix/issues/3931
    const { icons } = useLoaderData<typeof loader>();

    const dataTable = icons.map((icon) => {
        return {
            id: icon.id,
            image: icon.link,
            name: icon.name,
            tags: icon.tags,
        };
    });

    return (
        <>
            <Outlet />
            <div>
                <div>
                    {icons && icons.length > 0 && (
                        <Table
                            data={dataTable}
                            image={true}
                            endpoint="/api/icons"
                            search="name"
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();

    if (!isRouteErrorResponse(error)) {
        return <Link to="/dashboard/icons">Refresh</Link>;
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
