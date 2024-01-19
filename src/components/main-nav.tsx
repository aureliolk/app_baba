"use client"
import Image from "next/image"


import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/sites"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="rounded-[25%]">
      <Link href="/" >
        <Image src={'/logo_baba.png'} width={250} height={250} alt="Logo do Baba dos Amigos" />
      
      </Link>
    </div>
  )
}