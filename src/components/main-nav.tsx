"use client"
import Image from "next/image"


import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="rounded-[25%]">
      <Link href="/" >
        <Image src={'/logo_baba.png'} width={200} height={100} alt="Logo do Baba dos Amigos" />
      
      </Link>
    </div>
  )
}