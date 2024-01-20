"use client"

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { string } from "zod";



interface CreateUserFormData {
    avatar: string
    name: string;
    age: string;
    lastName: string;
    tel: string;
    userName: string;
    phrase: string;
    position: string;
    score: string
}


const ListPlayer = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const res = await fetch(`/api/user`);
            if (res.ok) {
              const data = await res.json();
              console.log(data)
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

      console.log(users.length)

    return (
        <div className="space-y-4 text-center w-full">
            <div className="font-bold text-lg font-Audiowide">
                ESCALAÇÃO
            </div>
            <div className="grid grid-cols-3 text-sm justify-items-center md:flex gap-2">

                {users.length > 0 && (
                    <>
                        {users.map((item: CreateUserFormData) => {
                            return (
                                <Popover key={item.tel}>
                                    <PopoverTrigger>
                                        <div className='flex justify-center space-y-2 items-center flex-col w-fit border border-muted p-2 rounded hover:bg-[#000]/90'>
                                            <Avatar className="w-[75px] h-[75px]" >
                                                <AvatarImage  src={item.avatar as any} />
                                                <AvatarFallback>{`${item.name.charAt(0)}${item.lastName.charAt(0)}`}</AvatarFallback>
                                            </Avatar>
                                        <p className="font-sans text-sm font-ligh">{item.name}</p>

                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] font-mono text-xs bg-[#000]/90 border-muted-foreground backdrop-blur-0" >
                                        <div className="flex flex-col mb-2">
                                            <p className="nd bg-clip-text text-transparent bg-gradient-to-r from-[#51FF45] via-[#2DC826] to-[#1F851F] ">Nome:</p>
                                            <p className="text-white">{item.name} {item.lastName}</p>
                                        </div>
                                        {item.userName && <div className="flex flex-col mb-2">
                                            <p className="bg-clip-text text-transparent bg-gradient-to-r from-[#51FF45] via-[#2DC826] to-[#1F851F]">Apelido:</p>
                                            <p className="text-white">{item.userName}</p>
                                        </div>}
                                        {item.phrase && <div className="flex flex-col mb-2">
                                            <p className="bg-clip-text text-transparent bg-gradient-to-r from-[#51FF45] via-[#2DC826] to-[#1F851F]">Frase:</p>
                                            <p className="text-white">{item.phrase}</p>
                                        </div>}
                                        {item.age && <div className="flex flex-col mb-2">
                                            <p className="bg-clip-text text-transparent bg-gradient-to-r from-[#51FF45] via-[#2DC826] to-[#1F851F]">Idade:</p>
                                            <p className="text-white">{item.age}</p>
                                        </div>}
                                        <div className="flex flex-col mb-2">
                                            <p className="bg-clip-text text-transparent bg-gradient-to-r from-[#51FF45] via-[#2DC826] to-[#1F851F]">Posição:</p>
                                            <p className="text-white">{legendPostion(item.position)}</p>
                                        </div>
                                        {item?.score && <div className="flex flex-col mb-2">
                                            <p className="bg-clip-text text-transparent bg-gradient-to-r from-[#51FF45] via-[#2DC826] to-[#1F851F]">Score:</p>
                                            84 pontos
                                        </div>}
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