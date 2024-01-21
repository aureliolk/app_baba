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

export async function GET(request: NextRequest) {
    const id = request.nextUrl.searchParams.get("id")
    const tel = request.nextUrl.searchParams.get("tel")

    if(id){
        const users = await prisma.user.findMany({
            where: {
                id: parseInt(id as string)
            }
        })
    
        return NextResponse.json(users)
    }

    if(tel){
        const user = await prisma.user.findMany({
            where:{
                tel:tel
            }
        })  

        if(user.length === 0){
            return NextResponse.json({
                status: false,
                msg: "Perfil não encontrado"
            })
        }

        const updateTrue = await prisma.user.update({
            where:{
                id: user[0].id
            },
            data:{
                update: true
            }
        })

        return NextResponse.json(user)
       
    }

    return NextResponse.json("Erro")
    
}

export async function PUT(request: NextRequest) {
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
        age: formData.get("age") as string,
        id: formData.get("id") as any,
        avatar: files[0].name
    }


    if (files[0] === "false" as any || files[0] === undefined || files[0] == "null" as any) {
        const createUser = await prisma.user.update({
            where: {
                id: parseInt(data.id)
            },
            data: {
                name: data.name,
                tel: data.tel,
                lastName: data.lastName,
                position: data.position,
                userName: data.userName,
                phrase: data.phrase,
                age: data.age,
                update: false
            }
        })
        console.log(createUser);
        return NextResponse.json({
            msg: "Jogador! Seu perfil foi atualizado com sucesso.",
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
                const createUser = await prisma.user.update({
                    where: {
                        id: parseInt(data.id)
                    },
                    data: {
                        name: data.name as string,
                        tel: data.tel as string,
                        lastName: data.lastName as string,
                        position: data.position as string,
                        userName: data.userName as string,
                        phrase: data.phrase as string,
                        age: data.age,
                        avatar: `${endPoint}/${Bucket}/public/${hashImg}-${files[0].name}`,
                        update: false
                    }
                })
                console.log(createUser);
                return NextResponse.json({
                    msg: "Jogador! Seu perfil foi atualizado com sucesso.",
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