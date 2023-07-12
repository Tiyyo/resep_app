import { Prisma } from "@prisma/client"
import { prisma } from "~/service/db.server"
import { FormIconProps, FormPropsEditIcon } from "./interfaces"


export default {
    async findAll() {
        try {
            const icons = await prisma.icons.findMany({
                include: {
                    tags: true
                }
            })
            const result = icons.map((icon) => {
                return { ...icon, tags: icon.tags.map((tag) => tag.tag_name) }
            })
            await prisma.$disconnect()
            return result
        } catch (error) {
            throw new Error("Server error can't acces data");
        }
    },
    async findById(id: number) {
        try {
            const icon = await prisma.icons.findUnique({
                where: {
                    id
                },
                include: {
                    tags: true
                }
            })
            if (icon) {
                return { ...icon, tags: icon.tags.map((tag) => tag.tag_name) }
            }
        } catch (error) {
            throw new Error("Can't find item with associated id");
        }
    },
    async add(form: FormIconProps) {
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
    },
    async update(form: FormPropsEditIcon) {
        try {
            if (form.tags) {
                const createTags = form.tags.map((tag) => {
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
                const updateIcon = await prisma.icons.update({
                    where: {
                        id: form.id
                    },
                    data: {
                        name: form.name,
                        link: form.imageLink,
                        image_key: form.imageKey,
                        tags: {
                            deleteMany: {},
                            create: createTags
                        }
                    },
                    include: {
                        tags: true
                    },
                })
                return updateIcon
            } else {
                const updateIcon = await prisma.icons.update({
                    where: {
                        id: form.id
                    },
                    data: {
                        name: form.name,
                        link: form.imageLink,
                        image_key: form.imageKey,
                    },
                })
                return updateIcon
            }
        } catch (error: any) {
            throw new Error("Couldn't update icon");
        }
    },
    async destroy(id: number) {
        try {
            const deleteIcon = await prisma.icons.delete({
                where: {
                    id
                }
            })
            await prisma.$disconnect()
            return deleteIcon
        } catch (error: any) {
            throw new Error('Error deleting icon')
        }
    },
}


