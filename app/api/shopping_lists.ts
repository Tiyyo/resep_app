import { Prisma } from "@prisma/client";
import { prisma } from "~/service/db.server";

export default {
    async add(author_id: number, form) {
        try {
            const shoppingList = await prisma.shopping_lists.create({
                data: {
                    meal_plan_id: form.meal_plan_id,
                    shoppin_lists_on_list_items: {
                        create: {
                            list_item: {
                                create: {
                                    name: form.name,
                                    qty: form.qty,
                                    unit_measure: form.unit,
                                }
                            }
                        }

                    }
                }
            })
            return shoppingList
        } catch (error) {
            console.log(error)
        }
    }
}