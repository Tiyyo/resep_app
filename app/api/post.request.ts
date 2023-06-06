import { prisma } from "~/utils/db.server"
import type { Prisma } from "@prisma/client"
import { json } from "@remix-run/node"


/**
 * 
 * @param {string} name 
 */
export async function addCategory(name: string) {
    let category
    category = {
        name
    }
    try {
        const createCategory = await prisma.ingredient_categories.create({ data: category })

        await prisma.$disconnect()
        return createCategory

    } catch (error) {
        return json({ error: 'This category already exist in database' }, { status: 400 })
    }

}

export async function addMacros(form: any) {
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
    } catch (error: any) {
        return json({ error: error.message })
    }

}

interface FormIconProps {
  name : string
  imageS3Url : string
  tags? : string[]
}

export async function addIcons (form : FormIconProps) {


    try {
    if(form.tags) {
      let createTags = form.tags.map((tag) => {
        return {
          tag : {
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
               data : {
                  name : form.name,
                  link : form.imageS3Url,
                  tags : {
                    create : createTags
                  }
              }, 
              include : {
                  tags : true
              }
          })
          return createIcon
    } else {
      const createIcon = await prisma.icons.create({
        data : {
           name : form.name,
           link : form.imageS3Url,
        }, 
      }) 
      return createIcon
    }
    } catch (error : any) {
        return error.message 

    }
    
}