import React, { useContext } from 'react'
import { AuthContext } from './AuthProvider';
import Swal from 'sweetalert2';

const Write = () => {
    const { user } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = e.target.text.value;
        const id = user.uid;

        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1; // Month is zero-based, so we add 1
        const day = now.getDate();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        // const seconds = now.getSeconds();

        const formattedDate = `Date: ${year}-${month}-${day} Time: ${hours}:${minutes}`;


        const info = { id, text, formattedDate };

        fetch("https://backend-lake-phi.vercel.app/notes", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(info)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                e.target.reset();
                Swal.fire(
                    'Success',
                    'Note Saved Successfully',
                    'success'
                )
            });

        // e.target.reset();
    }
    return (
        <>
            <div>
                <form className='flex flex-col justify-center items-center gap-4' onSubmit={handleSubmit}>
                    <textarea name="text" placeholder='write here' className='p-4 rounded text-black' cols="30" rows="10"></textarea>
                    <button type='submit' className='btn btn-neutral'>Save</button>
                </form>
            </div>
        </>
    )
}

export default Write