'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { phoneMaskGpt } from "@/lib/inputs"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const FormSchema = z.object({
    tel: z
        .string()
        .min(16, {
            message: "Insira o Nono digito jogador!"
        }),

})

export type ProfileUserData = z.infer<typeof FormSchema>


const CheckUser = () => {
    const [isLoading, setIsLoading] = useState(false);


    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<ProfileUserData>({
        resolver: zodResolver(FormSchema)
    })

    const checkUser = async (data: ProfileUserData) => {
        setIsLoading(true)
        const formData = new FormData()
        formData.append('tel', data.tel);
        const res = await fetch(`/api/profile/?tel=${data.tel}`)
        if (res.ok) {
            const dataRes = await res.json()
            console.log(dataRes)
            if (dataRes.status === false) {
                setIsLoading(false)
                return toast({
                    variant: "fail",
                    description: (
                        dataRes.msg
                    ),
                })
            }
            const sendMsg = await fetch("https://api.acos-services.tech/message/sendText/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": `${process.env.NEXT_PUBLIC_APIKEYWPP}`
                },
                body: JSON.stringify({
                    "number": `55${data.tel}`,
                    "options": {
                        "delay": 1200,
                        "presence": "composing",
                        "linkPreview": true
                    },
                    "textMessage": {
                        "text": `Clique no link abaixo para editar seu Perfil jogador! \n ${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/profile/?id=${dataRes[0].id}`
                    }
                })
            })
            if (sendMsg.ok) {
                const sendMsgData = await sendMsg.json()
                console.log(sendMsgData)
                reset()
                toast({
                    variant: "succsess",
                    description: (
                        "Link de atualização do seu perfil foi enviado para seu whatsapp"
                    ),
                })
                return setIsLoading(false)
            }

            console.log("erro")
            return setIsLoading(false)

        } else {
            console.log(`Esse arquivo teve erro ${res.status}`)
            return setIsLoading(false)
        }
    }

    return (
        <div className="w-full md:1/2 p-4 text-center">
            <h1 className="font-bold font-Audiowide text-lg mb-4">Digite seu WhatsApp</h1>
            <form onSubmit={handleSubmit(checkUser)} className="space-y-4">
                <div className="flex space-x-2">
                    <Input className="placeholder:text-[12px]" placeholder="WhatsApp*" type='tel' {...register("tel")} maxLength={16} onChange={phoneMaskGpt} />
                    {isLoading ?
                        <Button disabled className='flex items-center justify-center text-white'>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        </Button>
                        :
                        <Button className="w-fit text-white " type="submit">
                            Enviar
                        </Button>
                    }
                </div>
                {errors.tel && <span className="text-xs text-red-500 font-light">{errors.tel.message}</span>}
            </form>
        </div>
    )
}

export default CheckUser