
import ListPlayer from '@/components/listPlayer'

export default function Home() {
  return (
    <main>
      <div className='container flex flex-col space-y-8 my-8'>
        <h1 className='text-center text-3xl font-Audiowide font-extrabold w-full md:w-1/2 m-auto'>Faça Parte do <span className='bg-clip-text text-transparent bg-gradient-to-r from-[#51FF45] via-[#2DC826] to-[#1F851F]'>Melhor Baba</span> de Praia de <span className='bg-clip-text text-transparent bg-gradient-to-r from-[#51FF45] via-[#2DC826] to-[#1F851F]'>ILHÉUS</span>/BA.</h1>
        <ListPlayer />
      </div>
    </main>
  )
}
