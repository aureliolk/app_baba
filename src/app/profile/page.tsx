'use client'

import { useSearchParams } from 'next/navigation'

import CheckUser from "./components/checkUser"
import UpdateUser from "./components/updateUser"



const Profile = () => {

    const searchParams = useSearchParams()
    const id = searchParams.get('id')    

    return (
        <>
            {id ?
                <UpdateUser id={id} />
                :
                <CheckUser />
                }
        </>
    )
}

export default Profile