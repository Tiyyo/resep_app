import { prisma } from "~/service/db.server"
import { Prisma } from "@prisma/client"
import type { Ingredient_categories, Ingredients, Macros, } from "@prisma/client"


type ErrorMessage = {
  error: string
}

export interface FormIconProps {
  name: string
  imageLink: string
  imageKey: string
  tags?: string[]
}

export interface IngredientCreateForm {
  name: string
  unitWeight?: number | undefined | null
  categoryId: number
  macrosId?: number | undefined | null
  iconId?: number | undefined | null
}


/**
 * 
 * @param {string} name 
 */
export async function addCategory(name: string): Promise<Ingredient_categories | ErrorMessage | undefined> {
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
        return { error: 'There is a unique constraint violation , Already exists in database' }
      }
    }
  }

}

export async function addMacros(form: any): Promise<Macros | ErrorMessage | undefined> {
  let macro: Prisma.MacrosCreateInput
  console.log(form , 'DATA FORM BEFORE CREATE MACRO');
  try {
    macro = {
      food: form.food ?? null,
      calories: form.calories,
      proteins: form.proteins,
      carbs: form.carbs,
      fat: form.fat,
      water: form.water
    }
    const createMacro = await prisma.macros.create({ data: macro })
    await prisma.$disconnect()
    return createMacro
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw ({ error: 'Already exists in database' })
      }
      throw ({ error: 'Unable to add item to database' })

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
          image_key: form.imageKey,
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
          image_key: form.imageKey,
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


export async function addIngredients(form: IngredientCreateForm) {

  //--- Maybe not mandatory 
  if (form.macrosId === null) {
    form.macrosId = undefined
  }
  if (form.iconId === null) {
    form.iconId = undefined
  }
  //---

  try {
    const newIngredient = await prisma.ingredients.create({
      data: {
        name: form.name,
        unit_weight: form.unitWeight,
        category: form.categoryId && { connect: { id: form.categoryId } },
        macros: form.macrosId && { connect: { id: form.macrosId } },
        icon: form.iconId && { connect: { id: form.iconId } },
      },
    })
    await prisma.$disconnect()
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

export async function addRecipes(form) {

  const createInstruction = form.instructions.map((instruction: string) => {
    return {
      instructions: {
        create: {
          description: instruction
        }
      }
    }
  })

  const createMeasure = form.measures.map((m) => {
      return { qty: m.qty, unit_measure_id: m.unit_measure, ingredient_id: m.ingredient }
    })


  try {
    const newRecipe = await prisma.recipes.create({
      data: {
        name: form.name,
        prep_time: form.prepTime,
        cook_time: form.cookTime,
        author: {
          connect: {
            id: form.author
          }
        },
        servings: form.servings,
        macro_recipe: form.macrosId ?? undefined,
        difficulty: {
          connectOrCreate: {
            where: {
              name: form.difficulty,
            },
            create: {
              name: form.difficulty,
            },
          },
        },
        image: form.image && {
          create: { 
            link: form.image.link,
            imageKey: form.image.imageKey,
            width: form.image.width,  
          }},
        tags: form.tags && {
          create: form.tags.map((tag: string) => {
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
        },
        measures: {
          create: createMeasure
        },
        instructions: {
          create: createInstruction
          ,
        },
      }
    })
    return newRecipe.id
  } catch (error) {
    console.log(error)
  }
}

export async function addReview(form) {
  try {
    const newReview = await prisma.reviews.create({
      data: {
        rating: form.rating,
        comment: form.comment,
        author : {
          connect : {
            id : form.authorId
          }
        },
        recipe : {
          connect : {
            id : form.recipeId
          }
        }
      }
    })
    console.log(newReview);
    return newReview
  } catch (error) {
    console.log(error)
  }
}

// form.measures.map((measure) => {
//   return {
//     qty: measure.qty,
//     unit_measure_id: measure.unit_measure,
//     ingredientId: measure.ingredient
//   }
// })

