import ListPlayer from '@/components/listPlayer'
import Link from 'next/link';

export default function Home() {

  return (
    <main>
      <div className='container flex flex-col my-8 space-y-8 items-center'>
        <h1 className='text-center text-3xl font-Audiowide font-extrabold w-full md:w-1/2 m-auto'>Faça Parte do <br/> <span className='bg-clip-text text-transparent bg-gradient-to-r from-[#51FF45] via-[#2DC826] to-[#1F851F]'>Melhor Baba <br/></span> de Praia de</h1>
        <h2 className='text-4xl font-Audiowide font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#51FF45] via-[#2DC826] to-[#1F851F]'>ILHÉUS<span className='text-white'>/BA</span></h2>
        
        <Link href={"/register"} className='w-full md:w-1/3 p-2 rounded font-Audiowide font-bold text-center bg-gradient-to-r from-[#51FF45] via-[#2DC826] to-[#1F851F]'>
        Me Escalar
        </Link>
        <ListPlayer />
        <p className="text-center text-xs text-muted-foreground font-Audiowide">
          <Link href={"#"} >Contribua para o Baba dos Amigos 💚</Link>
        </p>
      </div>
    </main>
  )
}
