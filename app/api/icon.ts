import { Prisma } from "@prisma/client";
import { prisma } from "~/service/db.server";
import { FormIconProps, FormPropsEditIcon } from "./interfaces";
import DatabaseError from "~/helpers/errors/database.error";
import { Icon } from "~/types/recipe";
import NotFoundError from "~/helpers/errors/not.found.error";

export default {
  async findAll() {
    try {
      const icons = await prisma.icons.findMany({
        include: {
          tags: true,
        },
      });

      if (!icons) throw new NotFoundError("Can't find any icons");

      const result = icons.map((icon) => {
        return { ...icon, tags: icon.tags.map((tag) => tag.tag_name) };
      });
      await prisma.$disconnect();
      return result;
    } catch (error: any) {
      throw new DatabaseError(error.message, "icons", error);
    }
  },
  async findById(id: number): Promise<Icon[]> {
    try {
      const icon = await prisma.icons.findUnique({
        where: {
          id,
        },
        include: {
          tags: true,
        },
      });
      if (!icon)
        throw new DatabaseError("Can't find item with associated id", "icons");

      return { ...icon, tags: icon.tags.map((tag) => tag.tag_name) };
    } catch (error: any) {
      throw new DatabaseError(error.message, "icons", error);
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
            },
          };
        });

        const createIcon = await prisma.icons.create({
          data: {
            name: form.name,
            link: form.imageLink,
            image_key: form.imageKey,
            tags: {
              create: createTags,
            },
          },
          include: {
            tags: true,
          },
        });
        return createIcon;
      } else {
        const createIcon = await prisma.icons.create({
          data: {
            name: form.name,
            link: form.imageLink,
            image_key: form.imageKey,
          },
        });
        return createIcon;
      }
    } catch (error: any) {
      throw new DatabaseError(error.message, "icons", error);
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
            },
          };
        });
        await prisma.icons.update({
          where: {
            id: form.id,
          },
          data: {
            name: form.name,
            link: form.imageLink,
            image_key: form.imageKey,
            tags: {
              deleteMany: {},
              create: createTags,
            },
          },
          include: {
            tags: true,
          },
        });
      } else {
        const updateIcon = await prisma.icons.update({
          where: {
            id: form.id,
          },
          data: {
            name: form.name,
            link: form.imageLink,
            image_key: form.imageKey,
          },
        });
        return updateIcon;
      }
    } catch (error: any) {
      throw new DatabaseError(error.message, "icons", error);
    }
  },
  async destroy(id: number): Promise<Icon> {
    try {
      const deletedIcon = await prisma.icons.delete({
        where: {
          id,
        },
      });
      await prisma.$disconnect();
      return deletedIcon;
    } catch (error: any) {
      throw new DatabaseError(error.message, "icons", error);
    }
  },
};
