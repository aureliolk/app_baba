import { NextRequest, NextResponse } from "next/server";
import {
    S3Client,
    ListObjectsCommand,
    PutObjectCommand,
} from "@aws-sdk/client-s3";
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

const endPoint = 'https://data.acos-services.tech'
const accessKey = 'SLTVCWgB89QGhDOMcPvq'
const secretKey = 'vRSlv3JlzpmqfIPQEEDkxlmvp5srZO3KgzdsbFxS'
const Bucket = "data"

const s3 = new S3Client({
    region: 'us-east-1',
    endpoint: endPoint,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
    },
    forcePathStyle: true,
});

export async function GET() {
    const response = await s3.send(new ListObjectsCommand({ Bucket }));
    return NextResponse.json(response?.Contents ?? []);
  }

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const files = formData.getAll("avatar") as File[];
  console.log(files[0] == null)
  console.log(files[0] == "null" as any)


  if(files[0] === undefined || files[0] == "null" as any){
    const createUser = await prisma.user.create({
      data:{
        name: formData.get("name") as string,
        tel: formData.get("tel") as string,
        lastName: formData.get("lastname") as string,
      }
    })
    console.log(createUser);
    return NextResponse.json({
      msg:"User Create With Success Without Avatar",
      createUser,
    });
  }else{
    try {
      const response = await Promise.all(
        files.map(async (file) => {
          const Body = await file.arrayBuffer();
          const params = {
            Bucket,  // substitua por sua configuração específica
            Key: `public/${file.name}`,
            Body: Body,
          };
          return await s3.send(new PutObjectCommand(params as any));
        })
      );
      
      if(response[0].$metadata.httpStatusCode === 200){
        const createUser = await prisma.user.create({
          data:{
            name: formData.get("name") as string,
            tel: formData.get("tel") as string,
            lastName: formData.get("lastname") as string,
            avatar: files[0].name,
          }
        })
        console.log(createUser);
        return NextResponse.json({
          msg:"User Create With Success With Avatar",
          createUser,
        });
      }
  
      return NextResponse.json({
        msg:"Erro Update Img",
        response,
      });
    } catch (error) {
      console.error("Erro durante o upload para o S3:", error);
      return NextResponse.json({error});
    }
  }
  
}