import S3 from "aws-sdk/clients/s3"
import {  unstable_parseMultipartFormData, writeAsyncIterableToWritable} from "@remix-run/node";
import type { UploadHandler} from "@remix-run/node";
import { PassThrough } from "stream"
import cuid from "cuid"
import sharp from "sharp"

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
    const location = file.Location 
    const imageKey = file.Key
    return {location , imageKey};
  }

// second step
const uploadHandler: UploadHandler = async ({ name, data, filename }) => {

    if (name !== "image") {
        return undefined
    }

   const buffer = await convertToBuffer(data)

   const resizedBuffer = sharp(buffer).resize({height : 100 , width : 100 })

    try {
       const {location , imageKey} = await uploadStreamToS3(resizedBuffer, filename!);
       const locationAndKeyString = location + " " + imageKey
       return locationAndKeyString
    } catch(error) {
      throw new Error('Upload to S3 Bucket failed')
    } 
};

// frist step after action start 
export async function uploadImage(request: Request) {
    const formData = await unstable_parseMultipartFormData(
        request,
        uploadHandler
    );

    const file = formData.get("image")?.toString() || "";
    const splitString = file.split(" ")
    console.log(splitString);
    return {imageLink : splitString[0] , imageKey : splitString[1]};
}

export async function deleteImageFromBucket (link : string) {
  if (!bucketName) {
    throw new Error("BucketName environement varible is not set");  
  }

  let params = {
    Bucket : bucketName,
    Key : link
  }

  if (params && params.Key && params.Bucket) {
    await s3.deleteObject(params , async (error, data) => {
        if (error) {
          console.log('Operation failed')
        } else {
          console.log(data);
          console.log('Delete succesfully');
        }
    })

  }



}

  

  

  
