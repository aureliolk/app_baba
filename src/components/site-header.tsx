import Link from "next/link"

import { siteConfig } from "@/config/sites"
import { cn } from "@/lib/utils"
import { CommandMenu } from "@/components/command-menu"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { buttonVariants } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="flex flex-col justify-centers items-center sticky top-0 z-50 backdrop-blur mb-10">
      <MainNav />
      <div className="h-[1px] w-full bg-gradient-to-r from-[#51FF45] via-[#2DC826] to-[#1F851F]"></div>
    </header>
  )
}