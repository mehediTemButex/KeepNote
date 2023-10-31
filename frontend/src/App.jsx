import React from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainContainer from './pages/MainContainer';
import { Home } from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Notes from './pages/Notes';
import Update from './pages/Update';
import Write from './pages/Write';
import AuthProvider from './pages/AuthProvider';
import Private from './Private';
const AllRoute = createBrowserRouter([
  {
    path: "/",
    element: <MainContainer></MainContainer>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>
      },
      {
        path: "/profile",
        element: <Private><Profile></Profile></Private>
      },
      {
        path: "/write",
        element: <Private><Write></Write></Private>
      },
      {
        path: "/notes/:id",
        element: <Private><Notes></Notes></Private>,
        loader: ({ params }) => fetch(`https://backend-lake-phi.vercel.app/notes/${params.id}`)
      },
      {
        path: "/update/:id",
        element: <Private><Update></Update></Private>,
        loader: ({ params }) => fetch(`https://backend-lake-phi.vercel.app/update/${params.id}`)
      }
    ]
  }
])
const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={AllRoute}></RouterProvider>
    </AuthProvider>
  )
}

export default App