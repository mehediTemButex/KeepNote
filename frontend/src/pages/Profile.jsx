import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthProvider'

const Profile = () => {
    const { user } = useContext(AuthContext)
    console.log(user);
    const [data, setData] = useState([])
    useEffect(() => {
        fetch(`https://backend-lake-phi.vercel.app/notes/${user.uid}`)
            .then(res => res.json())
            .then(res => setData(res))
    }, [])
    return (
        <>
            <div className='flex justify-center items-center mt-8'>
                <div className='flex flex-col justify-center items-center'>
                    <div className='w-20 h-20'>
                        {
                            user.photoURL
                                ?
                                <>
                                    <img src={user.photoURL} alt="img" className='w-full h-full rounded-full' />
                                </>
                                :
                                <>
                                    <p className='uppercase font-bold flex justify-center items-center w-20 h-20 rounded-full bg-orange-500 text-white'>{user.email[0]}</p>
                                </>
                        }
                    </div>
                    <div>
                        {
                            user.displayName && <p>Name : {user.displayName}</p>
                        }
                        <p>Email : {user.email}</p>
                        <p>Total Notes : {data.length}</p>
                        {/* <p>Joined : </p> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile