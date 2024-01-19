import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { PrismaClient } from '@prisma/client'
import { randomUUID } from "crypto";


const prisma = new PrismaClient()

const endPoint = 'https://data.acos-services.tech'
const accessKey = process.env.accessKey as string
const secretKey = process.env.secretKey as string
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
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const files = formData.getAll("avatar") as File[];
  const hashImg = randomUUID()
  console.log(hashImg)
  console.log(files[0] == null)
  console.log(!files[0])
  const data = {
    name: formData.get("name") as string,
    lastName: formData.get("lastName") as string,
    tel: formData.get("tel") as string,
    position: formData.get("position") as string,
    phrase: formData.get("phrase") as string,
    userName: formData.get("userName") as string,
  }


  const checkUser = await prisma.user.findMany({
    where:{
      tel: data.tel
    }
  })

  if(checkUser.length === 0){
    if (files[0] === "false" as any || files[0] === undefined || files[0] == "null" as any) {
      const createUser = await prisma.user.create({
        data: {
          name: data.name,
          tel: data.tel,
          lastName: data.lastName,
          position: data.position,
          userName: data.userName,
          phrase: data.phrase
        }
      })
      console.log(createUser);
      return NextResponse.json({
        msg: "User Create With Success Without Avatar",
        createUser,
      });
    } else {
      try {
        const response = await Promise.all(
          files.map(async (file) => {
            const Body = await file.arrayBuffer();
            const params = {
              Bucket,  // substitua por sua configuração específica
              Key: `public/${hashImg}-${file.name}`,
              Body: Body,
              ContentType: file.type,
              Metadata: {
                'Content-Disposition': 'inline',
              },
            };
            return await s3.send(new PutObjectCommand(params as any));
          })
        );
  
        if (response[0].$metadata.httpStatusCode === 200) {
          const createUser = await prisma.user.create({
            data: {
              name: data.name as string,
              tel: data.tel as string,
              lastName: data.lastName as string,
              position: data.position as string,
              userName: data.userName as string,
              phrase: data.phrase as string,
              avatar: `${endPoint}/${Bucket}/public/${hashImg}-${files[0].name}`
  
            }
          })
          console.log(createUser);
          return NextResponse.json({
            msg: "User Create With Success With Avatar",
            createUser,
          });
        }
  
        return NextResponse.json({
          msg: "Erro Update Img",
          response,
        });
      } catch (error) {
        console.error("Erro durante o upload para o S3:", error);
        return NextResponse.json({ error });
      }
    }
  }

  return NextResponse.json({
    userCreate: true
  })

  

}