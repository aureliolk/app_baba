
import ListPlayer from '@/components/list-player'

export default function Home() {
  return (
    <main>
      <div className="whitespace-nowrap overflow-hidden">
        <span className="animate-slideIn">app em desenvolvimento by: Aurelio https://acos-services.tech</span>
      </div>

      <div className='container flex flex-col space-y-8 my-8'>
        <h1 className='text-center text-3xl font-sans font-bold w-full md:w-1/2 m-auto'>Faça Parte do Melhor Baba de Praia de Ilhéus</h1>
        <ListPlayer />
      </div>
    </main>
  )
}
