import { deleteIcon } from "~/api/delete.request";
import { convertStringToNumber } from "~/helpers/convert.to.number";
import { deleteImageFromBucket } from "~/utils/s3.server";
import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

export async function action ({request} : ActionArgs) {
    const method = request.method.toLowerCase()
    const formData = await request.formData()

    console.log(method , formData);

    switch (method){
        case "post": {
            //bloc de code
        }
        case "patch" : {
            // bloc de code
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