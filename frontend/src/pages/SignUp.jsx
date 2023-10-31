import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { AuthContext } from './AuthProvider';

const SignUp = () => {
    const { createUser, user } = useContext(AuthContext);
    const navigate = useNavigate()
    const [err, setErr] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(name, email, password);



        if (password.length < 6) {
            setErr("Password must have at leat 6 character");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setErr("Must have at least 1 Uppercase");
            return;
        }
        if (!/[^a-zA-Z0-9]/.test(password)) {
            setErr("Must have at least 1 special character");
            return;
        }
        setErr("");

        createUser(email, password)
            .then(res => {
                // console.log(res.user);
                form.reset();
                navigate('/');
                Swal.fire(
                    'Success',
                    'Account Created Successfully',
                    'success'
                );

            })
            .catch(err => {
                Swal.fire(
                    'Opps',
                    `${err.message}`,
                    'error'
                )
            })
    }
    return (
        <>
            <div className='flex flex-col items-center justify-center mt-6 md:mt-12'>
                <form className='space-y-3 w-fit' onSubmit={handleSubmit}>
                    <p className='text-center font-bold'>Create Account</p>
                    <input type="text" name='name' className='text-black border-none bg-blue-100 p-4 w-80 outline-none' required placeholder='Name' /><br />
                    <input type="email" name='email' className='text-black border-none bg-blue-100 p-4 w-80 outline-none' required placeholder='Email' /><br />
                    <input type="password" name='password' className='text-black border-none bg-blue-100 p-4 w-80 outline-none' required placeholder='Password' /><br />
                    <p>{err}</p>
                    <Link to="/signin">
                        <p className='text-xs py-1 hover:underline'>Already have account? Log in</p>
                    </Link>
                    <button type='submit' className='block mx-auto btn btn-neutral w-full'>Sign Up</button>
                </form>

            </div>
        </>
    )
}

export default SignUp