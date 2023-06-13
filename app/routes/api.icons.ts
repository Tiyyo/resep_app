import { deleteIcon } from "~/api/delete.request";
import { convertStringToNumber } from "~/helpers/convert.to.number";
import { deleteImageFromBucket, uploadImage } from "~/utils/s3.server";
import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { wordsToArray } from "~/helpers/wrodsToArray";
import { FormIconProps } from "~/api/post.request";
import { patchIcons } from "~/api/patch.request";

export interface FormPropsEditIcon extends FormIconProps {
    id : number
}

export async function action ({request} : ActionArgs) {
    const copyRequest = request.clone();
    const method = copyRequest.method.toLowerCase()
    const formData = await copyRequest.formData();
     

    switch (method){
        case "post": {
            //bloc de code
        }
        case "patch" : {
            const rawTags = formData.get("tags");
            
            if(!formData.get("name")) {
                return json({error : "A name is mandatory"})
            }
            let name = formData.get('name') as string
   
            if(!formData.get('id')) {
                return json({error : "An id should be provided"})
            }
            let id  = parseInt((formData.get('id') as string)) 
            
            let imageKey : string = ""
            let imageLink : string = ""
            if(formData.get('image')) {
                if(formData.get('imageKey')) {
                    await deleteImageFromBucket(formData.get('imageKey') as string)
                }
                const { imageLink : link, imageKey : key } = await uploadImage(request);
                imageLink = link 
                imageKey = key
            } else { 
                imageKey = formData.get('imageKey') as string
                imageLink = formData.get('imageLink') as string
            }


            let tags : string[] | undefined 
            if (rawTags && typeof rawTags === "string") {
                tags = wordsToArray(rawTags)
            }

            let form : FormPropsEditIcon = {name, id , tags, imageKey ,imageLink}


            try {
                const editedIcon = await patchIcons(form)
                return redirect('/admin_panel/icons')
            } catch (error) {
                return json({error : " Could not edit this icon"})
            }
        }
        case "delete" : {
            let id : string = formData.get('id')
            const idString =  {id}

            const idNumber = convertStringToNumber(idString)
            
            try {
                if(idNumber.id){
                    const deletedIcon = await deleteIcon(idNumber.id)
                    await deleteImageFromBucket(deletedIcon.image_key)
                    return json({status : 200})
                }
                throw new Error("No icon id provided");            
            } catch (error : any) {
                throw new Error(error.message);  
            }
        }
        default : {
            throw new Error('Invalid method')
        }

    }
}