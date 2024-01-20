import { useEffect, useState } from "react";
import { CreateUserFormData } from "@/app/register/components/user-register-form";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"




const ListPlayer = async () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user`);
            if (res.ok) {
              const data = await res.json();
              setUsers(data);
            } else {
              console.log("Failed to fetch data:", res.status);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchUsers();
      }, []);

    return (
        <div className="space-y-4 text-center">
            <div className="font-bold text-lg font-Audiowide">
                Jogadores do <br /> Baba dos Amigos
            </div>
            <div className="grid grid-cols-3 text-sm justify-items-center gap-y-2 ">

                {users.length > 0 && (
                    <>
                        {users.map((item: CreateUserFormData) => {
                            return (
                                <Popover key={item.tel}>
                                    <PopoverTrigger>
                                        <div className='flex justify-center space-y-2 items-center flex-col w-fit border border-muted p-2 rounded'>
                                            <Avatar className="w-[75px] h-[75px]" >
                                                <AvatarImage  src={item.avatar as any} />
                                                <AvatarFallback>{`${item.name.charAt(0)}${item.lastName.charAt(0)}`}</AvatarFallback>
                                            </Avatar>
                                        <p className="font-sans text-sm font-ligh">{item.name}</p>

                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] font-mono text-xs bg-zinc-900/90 border-muted-foreground backdrop-blur-0" >
                                        <div className="flex flex-col space-y-1">
                                            <p className="nd bg-clip-text text-transparent bg-gradient-to-r from-[#51FF45] via-[#2DC826] to-[#1F851F] ">Nome:</p>
                                            <p className="text-white">{item.name} {item.lastName}</p>
                                        </div>
                                        <div className="flex flex-col space-y-1">
                                            <p className="bg-clip-text text-transparent bg-gradient-to-r from-[#51FF45] via-[#2DC826] to-[#1F851F]">Apelido:</p>
                                            <p className="text-white">{item.userName}</p>
                                        </div>
                                        <div className="flex flex-col space-y-1">
                                            <p className="bg-clip-text text-transparent bg-gradient-to-r from-[#51FF45] via-[#2DC826] to-[#1F851F]">Frase:</p>
                                            <p className="text-white">{item.phrase}</p>
                                        </div>
                                        <div className="flex flex-col space-y-1">
                                            <p className="bg-clip-text text-transparent bg-gradient-to-r from-[#51FF45] via-[#2DC826] to-[#1F851F]">Idade:</p>
                                            {/* <p className="text-white">{item.userName}</p> */} 34
                                        </div>
                                        <div className="flex flex-col space-y-1">
                                            <p className="bg-clip-text text-transparent bg-gradient-to-r from-[#51FF45] via-[#2DC826] to-[#1F851F]">Posição:</p>
                                            <p className="text-white">{legendPostion(item.position)}</p>
                                        </div>
                                        <div className="flex flex-col space-y-1">
                                            <p className="bg-clip-text text-transparent bg-gradient-to-r from-[#51FF45] via-[#2DC826] to-[#1F851F]">Score:</p>
                                            84 pontos
                                        </div>
                                    </PopoverContent>
                                </Popover>

                            )
                        })}
                    </>
                )}
            </div>
        </div>
    );
};

export default ListPlayer;

const legendPostion = (postion: string)=>{
    if (postion === "zag") {
        return "Zagueiro"
    }else if(postion === "vol"){
        return "Volante"
    }else if(postion === "l_dir"){
        return "Lateral Direito"
    }else if(postion === "l_esq"){
        return "Lateral Esquerdo"
    }else return postion
}