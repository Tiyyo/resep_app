import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { withZod } from "@remix-validated-form/with-zod";
import * as Z from "zod";
import { convertStringToNumber } from "~/utils/convert.to.number";
import { validationError } from "remix-validated-form";
import { IngredientCreateForm, IngredientUpdateForm } from "~/api/interfaces";
import ingredient from "~/api/ingredient";


export const validator = withZod(
    Z.object({
        name: Z.string().toLowerCase().min(1, { message: "A name is required" }),
        categoryId: Z.string().min(1, { message: "You have a to pick a category" }),
        unitWeight: Z.string().optional(),
        macrosId: Z.string().optional(),
        iconId: Z.string().optional(),
        ingredientId: Z.string().min(1, { message: "Id not provided" }).optional(),
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
                unitWeight: unitWeight ?? "0",
            };

            try {
                const formConverted = await convertStringToNumber(fieldToConvert);

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

                if (form) {
                    await ingredient.add(form);
                    return json({ message: "Successfully added" }, { status: 201 });
                }
            } catch (error: any) {
                if (error.message === "Invalid values") {
                    console.log(error.message);
                    return json({ error: error.message + "! Numbers must be positive" }, { status: 400 })
                }
                return json({ error: "Server error ! Couldn't add to database" }, { status: 500 })
            }
        }
        case "patch": {
            const formData = await validator.validate(await request.formData());
            if (formData.error) return validationError(formData.error);

            const { ingredientId, iconId, categoryId, macrosId, name, unitWeight } = formData.data;

            const fieldToConvert = {
                iconId,
                categoryId,
                macrosId,
                ingredientId,
                unitWeight: unitWeight ?? "0",
            };
            try {
                const formConverted = await convertStringToNumber(fieldToConvert);

                // TODO fix this typescript error
                let form: IngredientUpdateForm = undefined;

                if (formConverted.categoryId && formConverted.ingredientId) {
                    form = {
                        name,
                        categoryId: formConverted.categoryId,
                        iconId: formConverted.iconId,
                        macrosId: formConverted.macrosId,
                        unitWeight: formConverted.unitWeight,
                        ingredientId: formConverted.ingredientId,
                    };
                }
                if (!form) throw new Error('Invalid values')
                await ingredient.update(form)
                return redirect('/dashboard/ingredients')
            } catch (error: any) {
                if (error.message === "Invalid values") {
                    return json({ error: error.message + "! Numbers must be positive" }, { status: 400 })
                }
                return json({ error: "Server error ! Couldn't update database" }, { status: 500 })
            }
        }
        case "delete": {
            const formData = await request.formData();
            const ingredientId = formData.get('id')

            if (typeof ingredientId === "string" && ingredientId) {
                await ingredient.destroy(+ingredientId)
                return json({ message: "Successfully deleted" }, { status: 204 });
            }
            return json({ error: 'An Id is mandatory to delete an item' }, { status: 400 })
        }
        default: {
            throw new Error('Invalid method')
        }

    }
}