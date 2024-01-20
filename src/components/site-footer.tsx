import Link from "next/link"

export const SiteFooter = ()=>{
    return (
        <div className="bg-zinc-900 py-2 flex items-center justify-center text-xs text-muted-foreground font-mono">
            <p>All Rigths Reserverd by: <Link href={"https://acos-services.tech"} className="text-green-600" >Acos Services</Link></p>
        </div>
    )
}