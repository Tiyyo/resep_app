import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { deleteCategories } from "~/api/delete.request";
import { patchCategories } from "~/api/patch.request";
import { addCategory } from "~/api/post.request";


export async function action({ request }: ActionArgs) {
    const formData = await request.formData();
    const method = request.method.toLowerCase()

    switch (method) {
        case "post": {
            const name = formData.get("category");
            if (typeof name !== "string") {
                return json({ error: "name argument should be a string" }, { status: 400 });
            }

            try {
                await addCategory(name);
                return json({ status: 200 })
            } catch (error) {
                return json(
                    {
                        error: "Failed to insert into database",
                        fields: { name: "This category already exist in database" },
                    },
                    { status: 400 }
                );
            }

        }
        case "patch": {
            const name = formData.get('category')
            const categoryId = formData.get('id')

            let id: number | undefined = undefined;

            if (typeof name !== "string") {
                return json({ error: "name argument should be a string" }, { status: 400 });
            }

            if (typeof categoryId === 'string') {
                id = parseInt(categoryId, 10)
            }

            if (typeof id !== "number") {
                return json({ error: "id argument should be a number" }, { status: 400 });
            }

            try {
                await patchCategories({ name, id })
                return redirect("/admin_panel/categories")

            } catch (error) {
                throw new Error("Couldn't add items to database");
            }

        }
        case "delete": {
            const categoryId = formData.get('id')
            let id: number | null = null;

            if (typeof categoryId === 'string') {
                id = parseInt(categoryId, 10)
            }

            if (typeof id !== "number") {
                return json({ error: "id argument should be a number" }, { status: 400 });
            }
            try {
                await deleteCategories(id)
                return json({ status: 200 })

            } catch (error) {
                throw new Error("Items can't be deleted");
            }
        }
        default: {
            throw new Error('Invalid method')
        }

    }
}