import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from './pages/AuthProvider';

const Private = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    if (loading) {
        return <>
            <div className='h-screen w-full flex justify-center items-center'>
                <span className="loading loading-spinner text-accent"></span>
            </div>

        </>
    }
    if (user) {
        return children;
    }
    return (
        <Navigate to="/signin"></Navigate>
    )
}

export default Private