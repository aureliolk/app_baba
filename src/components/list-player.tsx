'use client'
import { CreateUserFormData } from "@/app/register/components/user-register-form";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


const ListPlayer = () => {
    const [users, setUsers] = useState<CreateUserFormData[]>([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await fetch('/api/user');
                if (res.ok) {
                    const data = await res.json();
                    setUsers(data);
                } else {
                    console.log('Erro ' + res.status);
                }
            } catch (error) {
                console.error('Erro ao obter usuários:', error);
            }
        };

        getUsers();
    }, []); // A dependência vazia garante que o efeito é executado apenas uma vez, equivalente a componentDidMount

    if (!users) {
        return
    }

    return (
        <div className="space-y-4 text-center">
            <div className="font-bold text-lg font-Audiowide">
                Jogadores do <br/> Baba dos Amigos
            </div>
            <div className="flex gap-4 justify-center">

            {users.length > 0 && (
                <>
                    {users.map((item) => {
                        return (
                            <div key={item.tel} className='flex justify-center items-center flex-col w-fit border border-muted p-2 rounded'>
                                <Avatar>
                                    <AvatarImage src={item.avatar as any} />
                                    <AvatarFallback>{`${item.name.charAt(0)}${item.lastName.charAt(0)}`}</AvatarFallback>
                                </Avatar>
                                <p className="font-sans text-sm font-light text-white/60">{item.name} {item.lastName}</p>
                                <p>{item.userName}</p>
                            </div>
                        )
                    })}
                </>
            )}
            </div>
        </div>
    );
};

export default ListPlayer;
