import Link from "next/link"

export const SiteFooter = () => {
    return (
        <div className="mt-10">
            <div className="h-[1px] w-full bg-gradient-to-r from-[#51FF45] via-[#2DC826] to-[#1F851F]"></div>

            <div className="bg-zinc-900 py-2 flex items-center justify-center text-xs text-muted-foreground font-mono">
                <p>All Rigths Reserverd by: <Link href={"https://acos-services.tech"} className="text-green-600" >Acos Services</Link></p>
            </div>
        </div>
    )
}