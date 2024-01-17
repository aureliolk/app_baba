"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"


const FormSchema = z.object({
  avatar: z
    .instanceof(FileList)
    .transform(list => list.item(0)),
  name: z.string().min(2, {
    message: "Informe seu Nome",
  }),
  lastName: z.string().min(2, {
    message: "Informe seu Sobrenome"
  }),
  tel: z
    .string()
    .min(2, {
      message: "Informe seu WhatsApp"
    }),

})

type CreateUserFormData = z.infer<typeof FormSchema>

export function UserRegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateUserFormData>({
    resolver: zodResolver(FormSchema)
  })

  const createUser = async (data: any) => {
    const formData = new FormData()
    formData.append('name', data.name);
    formData.append('lastName', data.lastName);
    formData.append('tel', data.tel);
    formData.append('avatar', data.avatar);
    
    const res = await fetch("/api/documents3", {
      method: "POST",
      body: formData
    })
    if (res.ok) {
      toast({
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(await res.json(), null, 2)}</code>
          </pre>
        ),
      })
    } else {
      console.log(`Esse arquivo teve erro ${res.status}`)
    }
  }


  return (
    <form onSubmit={handleSubmit(createUser)} className="space-y-6">
      <Input type="file" accept="image/*" placeholder="Nome" {...register("avatar")} />
      {errors.avatar && <span>{errors.avatar.message}</span>}
      <Input placeholder="Nome" {...register("name")} />
      {errors.name && <span>{errors.name.message}</span>}
      <Input placeholder="Sobrenome" {...register("lastName")} />
      {errors.lastName && <span>{errors.lastName.message}</span>}
      <Input placeholder="WhatsApp" {...register("tel")} />
      {errors.tel && <span>{errors.tel.message}</span>}

      <Button className="w-full text-white" type="submit">Criar Conta</Button>
    </form>
  )
}
