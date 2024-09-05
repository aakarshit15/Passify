import React, { useContext, useEffect } from 'react'
import AllPasswordsContext from '../contexts/AllPasswordsContext';
import PasswordCard from './PasswordCard';
import Error from './Error';
import LogOutBtn from './LogOutBtn';

const AllPasswords = (props) => {

  const {allPasswords, setAllPasswords} = useContext(AllPasswordsContext);

  useEffect(() => {
    props.getAllPasswords()
  }, []);

  return (
    <>
    <main className="flex flex-col justify-center items-center gap-5">
      <div className="passwords flex flex-wrap justify-center items-center gap-5 px-10">
        {  
          allPasswords.length === 0 ? <Error title="No Passwords Created!!!" msg="Create password to view them here." /> :
          allPasswords.map((password, index) => {
            return <PasswordCard password={password} key={index} />
          })
        }
      </div>
      <LogOutBtn />
    </main>
    </>
  )
  
}

export default AllPasswords
