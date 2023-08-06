import { prisma } from "~/service/db.server";
import DatabaseError from "~/helpers/errors/database.error";
import NotFoundError from "~/helpers/errors/not.found.error";
import type { Icon, IconCreatInput } from "~/types";

export default {
  async findAll(): Promise<Icon[]> {
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
  async findById(id: number): Promise<Icon> {
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
  async add(form: IconCreatInput) {
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
            link: form.link,
            image_key: form.image_key,
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
            link: form.link,
            image_key: form.image_key,
          },
        });
        return createIcon;
      }
    } catch (error: any) {
      throw new DatabaseError(error.message, "icons", error);
    }
  },
  async update(form: Icon) {
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
            link: form.link,
            image_key: form.image_key,
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
            link: form.link,
            image_key: form.image_key,
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
