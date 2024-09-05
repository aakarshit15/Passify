import React, { useContext } from 'react'
import UserContext from '../contexts/UserContext';

const LogOutBtn = () => {

  const {user, setUser} = useContext(UserContext);

  const handleLogOut = (event) => {
    event.preventDefault();
    setUser(false);
    localStorage.clear();
  }

  return (
    <>
        <button onClick={(event) => {handleLogOut(event)}} className='flex justify-center items-center bg-blue-500 p-3 rounded-lg text-white font-semibold'>Log Out</button> 
    </>
  )
}

export default LogOutBtn
