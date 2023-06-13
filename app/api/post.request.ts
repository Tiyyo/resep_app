import { prisma } from "~/utils/db.server"
import {  Prisma } from "@prisma/client"
import type { Ingredient_categories, Ingredients, Macros,  } from "@prisma/client"


type ErrorMessage = {
  error : string
}

interface FormIconProps {
  name: string
  imageLink: string
  imageKey : string
  tags?: string[]

}


/**
 * 
 * @param {string} name 
 */
export async function addCategory(name: string) : Promise<Ingredient_categories | ErrorMessage | undefined> {
  let category
  category = {
    name
  }
  try {
    const createCategory = await prisma.ingredient_categories.create({ data: category })

    await prisma.$disconnect()
    return createCategory

  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {error :'There is a unique constraint violation , Already exists in database' }
      }
    }
  }

}

export async function addMacros(form: any): Promise<Macros | ErrorMessage | undefined> {
  let macro: Prisma.MacrosCreateInput
  try {
    macro = {
      food: form.food ?? null,
      calories: form.calories,
      proteins: form.proteins,
      carbs: form.proteins,
      fat: form.fat,
      water: form.water
    }
    const createMacro = await prisma.macros.create({ data: macro })
    await prisma.$disconnect()
    return createMacro
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw ({error : 'Already exists in database'})
      }
      throw ({error : 'Unable to add item to database'})

    }
  }
}


export async function addIcons(form: FormIconProps) {
  try {
    if (form.tags) {
      let createTags = form.tags.map((tag) => {
        return {
          tag: {
            connectOrCreate: {
              where: {
                name: tag.toLowerCase(),
              },
              create: {
                name: tag.toLowerCase(),
              },
            },
          }
        }
      })

      const createIcon = await prisma.icons.create({
        data: {
          name: form.name,
          link: form.imageLink,
          image_key : form.imageKey,
          tags: {
            create: createTags
          }
        },
        include: {
          tags: true
        }
      })
      return createIcon
    } else {
      const createIcon = await prisma.icons.create({
        data: {
          name: form.name,
          link: form.imageLink,
          image_key : form.imageKey,
        },
      })
      return createIcon
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error("Can't add 2 items with the same name")
      }
      throw new Error('Unable to add item to database')

    }
  }
}

// interface IngredientProps extends Prisma.Ingredients {
//   category : number 
//   macros : number | null | undefined
//   icon : number | null | undefined
// }

export interface IngredientCreateForm {
  name : string
  unitWeight? : number | undefined
  categoryId : number 
  macrosId? : number | undefined
  iconId? : number | undefined
}

export async function addIngredients(form : IngredientCreateForm) {

  console.log(typeof form.unitWeight, 'BEFORE ADD');
  try {
    const newIngredient = await prisma.ingredients.create({ data: {
        name : form.name, 
        unit_weight : form.unitWeight,
        category : {
          connect : {id : form.categoryId}
        },
        macros : {
          connect : {id : form.macrosId}
        },
        icon : {
          connect : {id : form.iconId}
        }
      }, 
    })
    await prisma.$disconnect()
    console.log(newIngredient);
    return newIngredient
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new Error("Can't add 2 items with the same name")
        }
        throw new Error('Unable to add item to database')
    }
  }
}