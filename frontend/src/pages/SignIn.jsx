import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from './AuthProvider';

const SignIn = () => {
    const { createUserGoogle, logIn } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(name, email, password);

        logIn(email, password)
            .then(res => {
                form.reset();
                navigate('/');
                Swal.fire(
                    'Success',
                    'Successfully Logged In',
                    'success'
                )
            })
            .catch(err => {
                Swal.fire(
                    'Opps',
                    `${err.message}`,
                    'error'
                )
            })
    }
    const googleSignIn = () => {
        createUserGoogle()
            .then(res => {
                navigate('/');
                Swal.fire(
                    'Success',
                    'Signed in by Google Successfully',
                    'success'
                )
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
                    <p className='text-center font-bold'>Log In Here</p>
                    <input type="email" name='email' className='text-black border-none bg-blue-100 p-4 w-80 outline-none' required placeholder='Email' /><br />
                    <input type="password" name='password' className='text-black border-none bg-blue-100 p-4 w-80 outline-none' required placeholder='Password' /><br />
                    <Link to="/signup">
                        <p className='text-xs py-2 hover:underline'>New Here ? Sign Up</p>
                    </Link>
                    <button type='submit' className='block w-full mx-auto btn btn-neutral'>Log In</button>
                </form>
                <div className='flex flex-col items-center'>
                    <p>Or</p>
                    <p>Sign in with</p>
                    <button className='btn' onClick={googleSignIn}><FcGoogle className='text-3xl' /></button>
                </div>
            </div>
        </>
    )
}

export default SignIn