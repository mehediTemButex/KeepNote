import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { AuthContext } from './AuthProvider'

const MainContainer = () => {
    const { logOut, user } = useContext(AuthContext)
    const handleLogOut = () => {
        logOut()
            .then(res => {
                console.log("signed out");
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <>
            <div className='min-h-screen bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 select-none'>
                <div className='flex justify-center items-center gap-4 py-12 text-white font-bold'>
                    {/* <p className='py-12 text-xl md:text-4xl lg:text-5xl text-orange-500 font-bold text-center'>Keep Note , Edit and Update</p> */}
                    <NavLink to="/" className={({ isActive }) => isActive ? "text-orange-500" : "text-white"}>Home</NavLink>
                    {
                        user ?
                            <>
                                <NavLink to="/profile" className={({ isActive }) => isActive ? "text-orange-500" : "text-white"}>Profile</NavLink>
                                <NavLink to="/write" className={({ isActive }) => isActive ? "text-orange-500" : "text-white"}>Write</NavLink>
                                <NavLink to={`/notes/${user.uid}`} className={({ isActive }) => isActive ? "text-orange-500" : "text-white"}>Notes</NavLink>
                                <NavLink to="/signin" onClick={handleLogOut} className={({ isActive }) => isActive ? "text-orange-500" : "text-white"}>Log out</NavLink>
                            </>
                            :
                            <>
                                <NavLink to="/signin" className={({ isActive }) => isActive ? "text-orange-500" : "text-white"}>Log in</NavLink>
                                /
                                <NavLink to="/signup" className={({ isActive }) => isActive ? "text-orange-500" : "text-white"}>Sign up</NavLink>
                            </>
                    }
                </div>
                <div className='text-white'>
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    )
}

export default MainContainer