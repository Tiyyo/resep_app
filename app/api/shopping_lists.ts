import { Prisma } from "@prisma/client";
import { prisma } from "~/service/db.server";

export default {
    async add(meal_plan_id: number, form) {

        console.log(form, 'ADD SHOPPING LIST IS CALLED')

        try {
            const shoppingList = await prisma.shopping_lists.create({
                data: {
                    meal_plan_id,
                    items: {
                        create: form.map((el) => {
                            return {
                                list_item: {
                                    create: {
                                        qty: Number(el.qty.toFixed(1)),
                                        unit_measure: {
                                            connect: {
                                                id: el.unit_measure_id
                                            }
                                        },
                                        ingredient: {
                                            connect: {
                                                id: el.ingredientId
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        )
                    }
                }
            })
            console.log(shoppingList)
            return shoppingList
        } catch (error) {
            console.log(error)
        }
    }
}