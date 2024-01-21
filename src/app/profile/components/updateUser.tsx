'use client'

import { UserFormData, legendPostion } from "@/components/listPlayer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { phoneMaskGpt } from "@/lib/inputs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"

const FormSchema = z.object({
    avatar: z
        .custom<FileList>()
        .transform((file) => file.length > 0 && file.item(0))
        .refine((file) => !file || (!!file && file.size <= 10 * 1024 * 1024), {
            message: "Por mano!! Imagem so até 10MB.",
        })
        .refine((file) => !file || (!!file && file.type?.startsWith("image")), {
            message: "Envie apenas imagens",
        }),

    name: z.string().min(2, {
        message: "Informe seu Nome",
    }),
    age: z.string().min(1, {
        message: "Insira sua Idade Jogador"
    }),
    lastName: z.string(),
    tel: z
        .string()
        .min(16, {
            message: "Insira o Nono digito jogador!"
        }),
    userName: z.string(),
    phrase: z.string(),
    position: z.string().min(2, {
        message: "Informe sua posição teimoso!"
    }),
    // score: z.string()
})

export type ProfileUserData = z.infer<typeof FormSchema>

interface UpdateUserProps {
    id: string
}

const UpdateUser = ({ id }: UpdateUserProps) => {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [users, setUsers] = useState<UserFormData[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<ProfileUserData>({
        resolver: zodResolver(FormSchema)
    })

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`/api/profile/?id=${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setValue("age", data[0]?.age)
                    setValue("lastName", data[0]?.lastName)
                    setValue("name", data[0]?.name)
                    setValue("phrase", data[0]?.phrase)
                    setValue("position", data[0]?.position)
                    setValue("tel", data[0]?.tel)
                    setValue("userName", data[0]?.userName)

                    setUsers(data);
                } else {
                    console.log("Failed to fetch data:", res.status);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchUsers();
    }, []);

    const updateUser = async (data: ProfileUserData) => {
        console.log(data.tel.length)
        setIsLoading(true)
        const formData = new FormData()
        formData.append('name', data.name);
        formData.append('lastName', data.lastName);
        formData.append('tel', data.tel);
        formData.append('avatar', data.avatar as any);
        formData.append('position', data.position)
        formData.append('phrase', data.phrase)
        formData.append('userName', data.userName)
        formData.append('age', data.age)
        formData.append('id', id as any)

        const res = await fetch("/api/profile", {
            method: "PUT",
            body: formData
        })
        if (res.ok) {
            const data = await res.json()
            console.log(data)
            toast({
                variant: "succsess",
                description: (
                    data.msg
                ),
            })
            setTimeout(() => {
                setIsLoading(false)
                window.location.href = "/"
            }, 3000);
            return setIsLoading(false)
        } else {
            console.log(`Esse arquivo teve erro ${res.status}`)
            return setIsLoading(false)
        }
    }

    return (
        <div className="w-ful md:w-1/2 md:m-auto">
            <h1 className="text-lg font-bold font-Audiowide text-center my-8">Edite Seu Perfil</h1>
            <form onSubmit={handleSubmit(updateUser)} className="space-y-4">
                {isLoading ?
                    <div className='flex items-center justify-center h-[400px]'>
                        <Loader2 className='animate-spin' />
                    </div>
                    :
                    <>
                        {avatarPreview ?
                            <div className='flex justify-center'>
                                <Avatar className='relative'>
                                    <AvatarImage src={avatarPreview} />
                                    <AvatarFallback>{`${users[0]?.name.charAt(0)}${users[0]?.lastName.charAt(0)}`}</AvatarFallback>
                                    <div onClick={() => setAvatarPreview("")} className='absolute inset-0 flex items-center justify-center cursor-pointer'>
                                        <Camera />
                                    </div>
                                </Avatar>
                            </div>
                            :
                            <>
                                <Label htmlFor='avatar' className='flex justify-center '>
                                    <div className='flex items-center cursor-pointer font-Audiowide text-white justify-center p-[1px] h-[100px] w-[100px]  rounded-full bg-gradient-to-r from-[#51FF45] via-[#2DC826] to-[#1F851F] overflow-hidden'>
                                        {!avatarPreview && users[0]?.avatar && (
                                            <div className='flex justify-center'>
                                                <Avatar className='relative'>
                                                    <AvatarImage src={users[0]?.avatar} />
                                                    <AvatarFallback>{`${users[0]?.name.charAt(0)}${users[0]?.lastName.charAt(0)}`}</AvatarFallback>
                                                </Avatar>
                                            </div>
                                        )}
                                    </div>
                                </Label>
                                <Input className="placeholder:text-[12px] hidden" id='avatar' type="file" accept="image/*" {...register("avatar", {
                                    onChange: (e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setAvatarPreview(URL.createObjectURL(file));
                                        } else {
                                            setAvatarPreview(null);
                                        }
                                    },
                                })} />
                            </>
                        }
                        {errors.avatar && <span className="text-xs text-red-500 font-light">{errors.avatar.message}</span>}
                        <div className="flex space-x-2">
                            <div className=" w-full">
                                <Input className="placeholder:text-[12px]" placeholder={`${users[0]?.name}*`} {...register("name")} defaultValue={users[0]?.name} />
                                {errors.name && <span className="text-xs text-red-500 font-light">{errors.name.message}</span>}
                            </div>
                            <div className=" w-full">
                                <Input className="placeholder:text-[12px]" placeholder={users[0]?.lastName} {...register("lastName")} />
                                {errors.lastName && <span className="text-xs text-red-500 font-light">{errors.lastName.message}</span>}
                            </div>
                        </div>
                        <div className='flex justify-between gap-2'>
                            <Input className="placeholder:text-[12px]" placeholder={users[0]?.userName} {...register("userName")} />
                            <Input className="placeholder:text-[12px] w-1/4 " placeholder={users[0]?.age} {...register("age")} />
                        </div>
                        {errors.userName && <span className="text-xs text-red-500 font-light">{errors.userName.message}</span>}
                        {errors.age && <span className="text-xs text-red-500 font-light">{errors.age.message}</span>}
                        <Input className="placeholder:text-[12px]" placeholder={users[0]?.phrase} {...register("phrase")} />
                        {errors.phrase && <span className="text-xs text-red-500 font-light">{errors.phrase.message}</span>}
                        <Input className="placeholder:text-[12px]" placeholder={`${users[0]?.tel}*`} type='tel' {...register("tel")} maxLength={16} onChange={phoneMaskGpt} defaultValue={users[0]?.tel} />
                        {errors.tel && <span className="text-xs text-red-500 font-light">{errors.tel.message}</span>}
                        <div className='flex flex-col'>
                            <select {...register("position")} className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-muted-foreground text-[12px]' defaultValue={users[0]?.position}>
                                <option value={""} >{legendPostion(users[0]?.position) + "*"}</option>
                                <option value="fixo">Fixo</option>
                                <option value="zag">Zagueiro</option>
                                <option value="vol">Volante</option>
                                <option value="l_dir">Lateral Direito</option>
                                <option value="l_esq">Lateral Esquerdo</option>
                                <option value="meia">Meia</option>
                                <option value="atacante">Atacante</option>
                                <option value="juiz">Arbitro</option>
                            </select>
                            {errors.position && <span className="text-xs text-red-500 font-light">{errors.position.message}</span>}
                        </div>

                        {isLoading ?
                            <Button disabled className='w-full flex items-center justify-center text-white'>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Atualizando Perfil ...
                            </Button>
                            :
                            <Button className="w-full text-white " type="submit">
                                Atualizar Perfil
                            </Button>
                        }
                    </>}
            </form>
        </div>
    )

}

export default UpdateUser