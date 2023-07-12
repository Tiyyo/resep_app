import { convertStringToNumber } from "~/utils/convert.to.number";
import { deleteImageFromBucket, uploadImage } from "~/service/s3.server";
import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { wordsToArray } from "~/utils/wrodsToArray";
import icon from "~/api/icon";
import { FormPropsEditIcon } from "~/api/interfaces";




export async function action({ request }: ActionArgs) {
    const copyRequest = request.clone();
    const method = copyRequest.method.toLowerCase()
    const formData = await copyRequest.formData();


    switch (method) {
        case "post": {
            const rawTags = formData.get("tags");
            try {
                const { imageLink, imageKey } = await uploadImage(request, "image_icon");

                let tags: string[] | undefined = undefined

                if (!formData.get("name")) {
                    return json({ error: "A name is mandatory" })
                }
                const name = formData.get('name') as string


                if (rawTags && typeof rawTags === "string") {
                    tags = wordsToArray(rawTags)
                }

                // check existence params

                const form = {
                    name,
                    tags,
                    imageLink,
                    imageKey,
                };

                const icons = await icon.add(form);
                if (!icons) {
                    await deleteImageFromBucket(form.imageKey)
                    return json({ error: "Could not add icon" }, { status: 400 });
                }
                return json({ status: 200 });
            } catch (error: any) {
                return json({ error: error.message }, { status: 500 });
            }
        }
        case "patch": {
            const rawTags = formData.get("tags");

            if (!formData.get("name")) {
                return json({ error: "A name is mandatory" })
            }
            let name = formData.get('name') as string

            if (!formData.get('id')) {
                return json({ error: "An id should be provided" })
            }
            let id = parseInt((formData.get('id') as string))

            let imageKey = ""
            let imageLink = ""


            if (formData.get('image_icon')) {

                const { imageLink: link, imageKey: key } = await uploadImage(request, 'image_icon');
                imageLink = link
                imageKey = key

                if (imageKey && imageLink) {
                    await deleteImageFromBucket(formData.get('key') as string)
                }

            } else {
                imageKey = formData.get('key') as string
                imageLink = formData.get('link') as string
            }


            let tags: string[] | undefined
            if (rawTags && typeof rawTags === "string") {
                tags = wordsToArray(rawTags)
            }

            const form: FormPropsEditIcon = { name, id, tags, imageKey, imageLink }

            try {
                await icon.update(form)
                return redirect('/dashboard/icons')
            } catch (error) {
                return json({ error: " Could not edit this icon" }, { status: 500 })
            }
        }
        case "delete": {
            if (!formData.get('id')) {
                return json({ error: "An id should be provided" })
            }
            const id = formData.get('id') as string
            const idString = { id }

            const idNumber = await convertStringToNumber(idString)

            try {
                if (idNumber.id) {
                    const deletedIcon = await icon.destroy(idNumber.id)
                    await deleteImageFromBucket(deletedIcon.image_key)
                    return json({ status: 200 })
                }
                throw new Error("No icon id provided");
            } catch (error: any) {
                throw new Error(error.message);
            }
        }
        default: {
            throw new Error('Invalid method')
        }
    }
}