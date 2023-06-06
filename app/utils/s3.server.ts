import S3 from "aws-sdk/clients/s3"
import { unstable_parseMultipartFormData, writeAsyncIterableToWritable} from "@remix-run/node";
import type { UploadHandler} from "@remix-run/node";
import { PassThrough } from "stream"
import cuid from "cuid"
import sharp from "sharp"
import DeleteObjectRequest from "aws-sdk/clients/s3";

const tinify = require('tinify')
tinify.key = process.env.TINIFY_API_KEY

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



function resizeFile (file : File, width : number, height : number, name : string) {
    const source = tinify.fromFile(file);
    const resized = source.resize({
        method : 'cover' ,
        width : width,
        height : height ,
    })
    resized.toFile(`${name}_w${width}.png`)
    return resized
}

async function convertToBuffer(data: AsyncIterable<Uint8Array>): Promise<Buffer> {
    const chunks = [];
    let totalLength = 0 ;

    for await (const chunck of data) {
            chunks.push(chunck);
            totalLength += chunck.length
    }
    const buffer = Buffer.concat(chunks, totalLength)

    // const file = new File(blob, filename, { type: 'contentType' });
    // const buffer = Buffer.from(file)

    // if (file && file instanceof File) {
    //     // Convert the file stream to a Buffer
    //     const chunks = [];
    //     for await (const chunk of file.stream()) {
    //       chunks.push(chunk);
    //     }
    //     const buffer = Buffer.concat(chunks
    return buffer
}

// function typedArrayToBuffer(array: Uint8Array): ArrayBuffer {
//     return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset)
// }

// function convertUnit8ToBuffer (arr : Uint8Array | AsyncIterable<Uint8Array>) {
//     const buf = Buffer.from(arr)
//     return buf
// }
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


export async function uploadStreamToS3(data: any, filename: string) {
    const stream = uploadStream({
      Key: `${cuid()}.${filename.split(".").slice(-1)}`,
    });
    await writeAsyncIterableToWritable(data, stream.writeStream);
    const file = await stream.promise;
    return file.Location;
  }


const uploadHandler: UploadHandler = async ({ name, data, filename }) => {

    if (name !== "image") {
        return undefined
    }

   const buffer = await convertToBuffer(data)
   const resizedBuffer = await sharp(buffer).resize({height : 100 , width : 100 , fit : "cover"}).toBuffer()

    const uploadedFileLocation = await uploadStreamToS3(resizedBuffer, filename!);
    return uploadedFileLocation;
};

export async function uploadImage(request: Request) {
    const formData = await unstable_parseMultipartFormData(
        request,
        uploadHandler
    );

    const file = formData.get("image")?.toString() || "";
    return file;
}

export async function deleteImageFromBucket (link) {

  const response = await s3.deleteObject({Bucket : bucketName , Key : link} , (err, data) => {
    console.log(err);
    console.log(data);
  })

}

  

  

  
