import React, { useState } from 'react'
import { RiDeleteBack2Fill, RiEditFill } from "react-icons/ri";
import { Link, useLoaderData } from 'react-router-dom';

const Notes = () => {
    const data = useLoaderData()
    const [restdata, setRestData] = useState(data);
    const [loading, setLoadng] = useState(false);

    const handleDelete = (id) => {
        setLoadng(true);
        fetch(`https://backend-lake-phi.vercel.app/notes/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(res => {
                if (res.deletedCount > 0) {
                    const remaining = restdata.filter(ele => ele._id !== id);
                    setRestData(remaining);
                    setLoadng(false);
                }
            })
    }

    return (
        <>
            <div>
                {
                    loading
                        ?
                        <div className='h-[50vh] flex items-center justify-center'>
                            <span className="loading loading-spinner text-error"></span>
                        </div>
                        :
                        <div className='flex flex-wrap gap-4 px-2 md:px-12 lg:px-20 justify-center'>
                            {
                                restdata.length > 0 ?
                                    restdata.map((ele) => {
                                        return <div className='bg-gray-200 rounded-md p-4 w-72 max-h-80 flex justify-between gap-2' key={ele._id}>
                                            <div className='overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300'>
                                                <p className='text-black text-xs pb-4'>{ele.formattedDate}</p>
                                                <p className='text-black'>{ele.text}</p>
                                            </div>
                                            <div>
                                                <button className='btn-neutral block bg-orange-500 border-none text-xl rounded-md p-2' onClick={() => handleDelete(ele._id)}>
                                                    <RiDeleteBack2Fill></RiDeleteBack2Fill>
                                                </button>
                                                <Link to={`/update/${ele._id}`}>
                                                    <button className='btn-neutral block bg-orange-500 border-none text-xl rounded-md p-2 mt-2'>
                                                        <RiEditFill></RiEditFill>
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    })
                                    :
                                    <div className='flex justify-center items-center h-[50vh] lg:mt-12'>
                                        <p className='text-xl text-white text-center'>No Item to show <br /> Write note and save it first</p>
                                    </div>
                            }
                        </div>
                }
            </div>
        </>
    )
}

export default Notes