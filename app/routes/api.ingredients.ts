import type { ActionArgs } from "@remix-run/node";
import type { IngredientCreateForm } from "~/api/post.request";
import { json, redirect } from "@remix-run/node";
import { withZod } from "@remix-validated-form/with-zod";
import { deleteIngredient } from "~/api/delete.request";
import { patchIngredients } from "~/api/patch.request";
import * as Z from "zod";
import { addIngredients } from "~/api/post.request";
import { convertStringToNumber } from "~/utils/convert.to.number";
import { validationError } from "remix-validated-form";


export const validator = withZod(
    Z.object({
        name: Z.string().toLowerCase(),
        categoryId: Z.string(),
        unitWeight: Z.string().optional(),
        macrosId: Z.string().optional(),
        iconId: Z.string().optional(),
    })
);

export async function action({ request }: ActionArgs) {
    const method = request.method.toLowerCase()

    switch (method) {
        case "post": {
            const formData = await validator.validate(await request.formData());
            if (formData.error) return validationError(formData.error);

            const { iconId, categoryId, macrosId, name, unitWeight } = formData.data;

            const fieldToConvert = {
                iconId,
                categoryId,
                macrosId,
                unitWeight,
            };

            const formConverted = convertStringToNumber(fieldToConvert);
            let form: IngredientCreateForm | undefined = undefined;

            if (formConverted.categoryId) {
                form = {
                    name,
                    categoryId: formConverted.categoryId,
                    iconId: formConverted.iconId,
                    macrosId: formConverted.macrosId,
                    unitWeight: formConverted.unitWeight,
                };
            }

            try {
                if (form)
                    await addIngredients(form);
                return json({ status: 200 });
            } catch (error: any) {
                return json({ error: error.message }, { status: 400 });
            }
        }
        case "patch": {
            const formData = await request.formData();
            const iconId = Number(formData.get('iconId'))
            const macrosId = Number(formData.get('macrosId'))
            const ingredientId = Number(formData.get('id'))
            const unitWeight = Number(formData.get('unitWeight')) ?? null
            const categoryId = Number(formData.get('categoryId'))
            const name = formData.get('name')

            if (!name) {
                return json({ error: "A name is mandatory" })
            }
            if (!ingredientId) {
                return json({ error: "You should provide an Id" })
            }

            if (!categoryId) {
                return json({ error: "You have to pick a category" })
            }

            const form = {
                ingredientId, name, unitWeight, categoryId, macrosId, iconId,
            }

            try {
                const updateIngredient = await patchIngredients(form)
                return redirect('/admin_panel/ingredients')
            } catch (error) {
                console.log(error);
                return json({ error: "Something went wrong " })
            }

        }
        case "delete": {
            const formData = await request.formData();
            const ingredientId = formData.get('id')

            if (typeof ingredientId === "string" && ingredientId) {
                const deletedIngr = await deleteIngredient(+ingredientId)
                return deletedIngr
            }
            return json({ error: 'An Id is mandatory to delete an item' }, { status: 400 })
        }
        default: {
            throw new Error('Invalid method')
        }

    }
}