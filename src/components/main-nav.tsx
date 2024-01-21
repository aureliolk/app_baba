"use client"
import Image from "next/image"


import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MobileNav } from "./mobile-nav"
import { Instagram } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="w-full flex items-center pl-2">
      <MobileNav />
      <div className="rounded-[25%] m-auto">
        <Link href="/" >
          <Image src={'/logo_baba.png'} width={200} height={100} alt="Logo do Baba dos Amigos" />
        </Link>
      </div>
      <Link href={"/"} className="pr-2 text-muted-foreground">
          <Instagram />
      </Link>
    </div>

  )
}