import './App.css'
import { useEffect, useState } from 'react';
import AuthRoutes from './components/AuthRoutes';
import UnAuthRoutes from './components/UnAuthRoutes';
import UserContext from './contexts/UserContext';
import axios from 'axios';

function App() {

  const [user, setUser] = useState(false);

  useEffect(() => {
    const tryLogin = async () => {
      if(localStorage.getItem("token")) {
        try{
          const response = await axios.post("http://localhost:3000/getUser", {}, { headers: {'Authorization' : `Bearer ${localStorage.getItem("token")}`} });
          if(response.data.reqSuccess) {
            setUser(response.data.user);
          }
        } catch (err) {
          console.error(`Error direct loggin in: ${err}`);
        }
      }
    }
    tryLogin();
  }, []);

  return (
    <>
      <UserContext.Provider value={{user, setUser}}>
        { user ? <AuthRoutes /> : <UnAuthRoutes/> }
      </UserContext.Provider>
    </>
  )
}

export default App
