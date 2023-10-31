import React, { useContext } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { AuthContext } from './AuthProvider';

const Update = () => {
    const { user } = useContext(AuthContext)
    const data = useLoaderData();
    const navigate = useNavigate();
    console.log(data);
    const handleSubmit = (e) => {
        e.preventDefault();
        const text = e.target.text.value;

        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1; // Month is zero-based, so we add 1
        const day = now.getDate();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        // const seconds = now.getSeconds();

        const formattedDate = `Date: ${year}-${month}-${day} Time:${hours}:${minutes}`;


        const info = { text, formattedDate };

        fetch(`https://backend-lake-phi.vercel.app/notes/${data._id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(info)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                Swal.fire(
                    'Success',
                    'Note Updated Successfully',
                    'success'
                );
                navigate(`/notes/${user.uid}`);
            });

        // e.target.reset();
    }
    return (
        <>
            <div>
                <form className='flex flex-col justify-center items-center gap-4' onSubmit={handleSubmit}>
                    <textarea name="text" placeholder='write here' className='p-4 rounded text-black' cols="30" rows="10" defaultValue={data.text}></textarea>
                    <button type='submit' className='btn btn-neutral'>Update</button>
                </form>
            </div>
        </>
    )
}

export default Update