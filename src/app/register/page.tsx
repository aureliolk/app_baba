import { Metadata } from "next"
import Link from "next/link"
import { UserRegisterForm } from "@/app/register/components/user-register-form"



export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
  return (
    <>
      <div className="container flex justify-center items-center mt-4">
        <div className="flex flex-col w-full md:w-1/2 space-y-4">
        <p className="font-bold text-lg text-white font-Audiowide text-center" >
          Faça seu Cadastro Jogador!
        </p>
        <UserRegisterForm />
        <p className="px-8 text-center text-sm text-muted-foreground font-Audiowide">
          <Link href={"#"} >Doe para o Baba dos Amigos 💚</Link>
        </p>
        </div>
      </div>
    </>
  )
}