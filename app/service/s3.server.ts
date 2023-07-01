import S3 from "aws-sdk/clients/s3"
import {  unstable_parseMultipartFormData, writeAsyncIterableToWritable} from "@remix-run/node";
import type { UploadHandler} from "@remix-run/node";
import { PassThrough } from "stream"
import cuid from "cuid"
import sharp from "sharp"
import { image } from "remix-utils";

const region = process.env.BUCKET_REGION;
const bucketName = process.env.BUCKET_NAME;
const accessKeyId = process.env.ACCESS_S3_KEY;
const secretAccessKey = process.env.ACCESS_SECRET_KEY_S3;

if(!region || !bucketName || !accessKeyId || !secretAccessKey) {
    throw new Error('S3 bucket storage is missing required configuration. Expect 4 environements variables ')
}

const s3 = new S3({
    region, accessKeyId, secretAccessKey, signatureVersion: "v4",
})

async function convertToBuffer(data: AsyncIterable<Uint8Array>): Promise<Buffer> {
    const chunks = [];
    let totalLength = 0 ;

    for await (const chunck of data) {
      chunks.push(chunck);
      totalLength += chunck.length
    }

    const buffer = Buffer.concat(chunks, totalLength)

    return buffer
}

//fourth step 
const uploadStream = ({ Key }: Pick<S3.Types.PutObjectRequest, "Key">) => {
    const s3 = new S3({
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    },
    region: region,
    signatureVersion: "v4"
    });
    const pass = new PassThrough();
    console.log(pass, 'PASS IS CALLED');
    return {
      writeStream: pass,
      promise: s3.upload({ Bucket: bucketName, Key, Body: pass }).promise(),
    };
  };


// third step
export async function uploadStreamToS3(data: any, filename: string) {
    const stream = uploadStream({
      Key: `${cuid()}.${filename.split(".").slice(-1)}`,
    });
    await writeAsyncIterableToWritable(data, stream.writeStream);
    const file = await stream.promise;
    console.log(file, 'STREAM FILE IS CREATED');
    const location = file.Location 
    const imageKey = file.Key
    return {location , imageKey};
  }

// second step
const uploadHandler: UploadHandler = async ({ name, data, filename }) => {

  if (!name.includes("image")) {
        return undefined
    }

   

   const buffer = await convertToBuffer(data)
   if(!buffer) {  
    return undefined
    }

   const resizedBuffer = resizeImageByHisNameInput(name , buffer)

    try {
       const {location , imageKey} = await uploadStreamToS3(resizedBuffer, filename!);
       console.log(location , imageKey , 'IS LOCATION IMAGEKEY ARE GOT');
       const locationAndKeyString = location + " " + imageKey
       return locationAndKeyString
    } catch(error) {
      throw new Error('Upload to S3 Bucket failed')
    } 
};

// frist step after action start 
export async function uploadImage(request: Request, nameInput: string) {
    const formData = await unstable_parseMultipartFormData(
        request,
        uploadHandler
    );

    const file = formData.get(nameInput)?.toString() || "";
    const splitString = file.split(" ")
    return {imageLink : splitString[0] , imageKey : splitString[1]};
}

export async function deleteImageFromBucket (imageKey : string) {
  if (!bucketName) {
    throw new Error("BucketName environement varible is not set");  
  }

  let params = {
    Bucket : bucketName,
    Key : imageKey
  }

  if (params && params.Key && params.Bucket) {
    s3.deleteObject(params , async (error, data) => {
        if (error) {
          throw new Error("Image couldn't be delete from bucket");
        } else {
          console.log('Delete succesfully');
        }
    })
  }
}

function resizeImageByHisNameInput (nameInput : string, buffer : Buffer) {

    switch (nameInput) {
      case 'image_icon' :
        const resizedBufferIcon = sharp(buffer).resize({height : 100 , width : 100 })
        return resizedBufferIcon
      case 'image_recipe' :
        const resizedBufferRecipe = sharp(buffer).resize({height : 1080 , width : 1080 })
        return resizedBufferRecipe
        default:
          return null
    }
}

  

  

  
