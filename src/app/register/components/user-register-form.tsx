"use client"
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { redirect } from 'next/navigation'
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {  phoneMaskGpt } from '@/lib/inputs';


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
  lastName: z.string(),
  tel: z
    .string()
    .min(16, {
      message: "Insira o Nono digito jogador!"
    }),
  userName: z.string(),
  phrase: z.string(),
  position: z.string().min(2,{
    message:"Informe sua posição teimoso!"
  })
})

export type CreateUserFormData = z.infer<typeof FormSchema>

export function UserRegisterForm() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors },reset } = useForm<CreateUserFormData>({
    resolver: zodResolver(FormSchema)
  })

  const createUser = async (data: CreateUserFormData) => {
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

    const res = await fetch("/api/user", {
      method: "POST",
      body: formData
    })
    if (res.ok) {
      const data = await res.json()
      if(data.userCreate){
        setIsLoading(false)
        return toast({
          variant:"fail",
          description: (
            "Você ja esta cadastrado jogador!"
          ),
        })
      }
      reset()
      setIsLoading(false)
       toast({
        variant:"succsess",
        description: (
          "Cadastro Feito com Sucesso Jogador"
        )
      })
      setTimeout(() => {
        window.location.href = "/"
      }, 3000);
      return
      
    } else {
      console.log(`Esse arquivo teve erro ${res.status}`)
      return setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(createUser)} className="space-y-4 ">
      {avatarPreview ?
        <div className='flex justify-center'>
          <Avatar className='relative'>
            <AvatarImage src={avatarPreview} />
            <AvatarFallback>CN</AvatarFallback>
            <div onClick={()=>setAvatarPreview("")} className='absolute inset-0 flex items-center justify-center cursor-pointer'>
              <Camera />
            </div>
          </Avatar>
        </div>
        :
        <>
          <Label htmlFor='avatar' className='flex justify-center '>
            <div className='flex items-center cursor-pointer font-Audiowide text-white justify-center p-[1px] h-[100px] w-[100px]  rounded-full bg-gradient-to-r from-[#51FF45] via-[#2DC826] to-[#1F851F]'>
              Avatar
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
          <Input className="placeholder:text-[12px]" placeholder="Nome*" {...register("name")} />
          {errors.name && <span className="text-xs text-red-500 font-light">{errors.name.message}</span>}
        </div>
        <div className=" w-full">
          <Input className="placeholder:text-[12px]" placeholder="Sobrenome" {...register("lastName")} />
          {errors.lastName && <span className="text-xs text-red-500 font-light">{errors.lastName.message}</span>}
        </div>
      </div>
      <Input className="placeholder:text-[12px]" placeholder="Apelido" {...register("userName")} />
      {errors.userName && <span className="text-xs text-red-500 font-light">{errors.userName.message}</span>}
      <Input className="placeholder:text-[12px]" placeholder="Frase que te Define" {...register("phrase")} />
      {errors.phrase && <span className="text-xs text-red-500 font-light">{errors.phrase.message}</span>}
      <Input className="placeholder:text-[12px]" placeholder="WhatsApp*" type='tel' {...register("tel")} maxLength={16} onChange={phoneMaskGpt} />
      {errors.tel && <span className="text-xs text-red-500 font-light">{errors.tel.message}</span>}
      <div className='flex flex-col'>
      <select {...register("position")} className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-muted-foreground text-[12px]'>
        <option value={""} >Escolha sua posição Teimoso!</option>
        <option value="fixo">Fixo</option>
        <option value="zag">Zagueiro</option>
        <option value="vol">Volante</option>
        <option value="l_dir">Lateral Direito</option>
        <option value="l_esq">Lateral Esquerdo</option>
        <option value="meia">Meia</option>
        <option value="atacante">Atacante</option>
      </select>
      {errors.position && <span className="text-xs text-red-500 font-light">{errors.position.message}</span>}
      </div>

      {isLoading ?
        <Button disabled className='w-full flex items-center justify-center text-white'>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Cadastrando ...
        </Button>
        :
        <Button className="w-full text-white " type="submit">
          Criar Conta
        </Button>}
    </form>
  )
}
