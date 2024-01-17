import { NextRequest, NextResponse } from "next/server";
import * as Minio from 'minio'
import { writeFile } from 'fs/promises'
var Fs = require('fs')

const endPoint = 'data.acos-services.tech'
const accessKey = 'SLTVCWgB89QGhDOMcPvq'
const secretKey = 'vRSlv3JlzpmqfIPQEEDkxlmvp5srZO3KgzdsbFxS'
const Bucket = "data"

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const file: File | null = formData.get('avatar') as unknown as File
    if (!file) {
        return NextResponse.json({ success: false })
    }
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const path = `./tmp/${file.name}`
    await writeFile(path, buffer)

    console.log(file)
    
    const minioClient = new Minio.Client({
        endPoint: endPoint,
        port: 9000,
        useSSL: true,
        accessKey: accessKey,
        secretKey: secretKey,
    });

    const sourceFile = path
    const bucket = "typebot"
    const destinationObject = file.name

    minioClient.presignedPutObject(sourceFile, file.name, (err, url) => {
        if (err) throw err
        return NextResponse.json({
            msg: 'Arquivo enviado com sucesso para o MinIO.',
            url
        });
    })

}


/*
 // Check if the bucket exists
    // If it doesn't, create it
    const exists = await minioClient.bucketExists(bucket)

    console.log(exists)
    if (exists) {
        console.log('Bucket ' + bucket + ' exists.')
    } else {
        await minioClient.makeBucket(bucket, 'us-east-1')
        console.log('Bucket ' + bucket + ' created in "us-east-1".')
    }

    // Set the object metadata
    var metaData = {
        'Content-Type': `${file.type}`,
        'X-Amz-Meta-Testing': 1234,
    }

    await minioClient.fPutObject(bucket, destinationObject, sourceFile, metaData)
    console.log('File ' + sourceFile + ' uploaded as object ' + destinationObject + ' in bucket ' + bucket)

    return NextResponse.json({
        msg: 'Arquivo enviado com sucesso para o MinIO.',
    });

*/