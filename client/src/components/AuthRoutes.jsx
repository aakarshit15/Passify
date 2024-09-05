import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AllPasswordsContext from '../contexts/AllPasswordsContext';
import AllPasswords from './AllPasswords';
import EditPassword from './EditPassword';
import { useEffect, useState } from 'react';
import axios from "axios";
import Template from './Template';

const AuthRoutes = () => {

  const [allPasswords, setAllPasswords] = useState([]);

  const getAllPasswords = async () => {
    try {
      const response = await axios.post("http://localhost:3000/getAllPasswords", {}, { headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} });
      if(response.data.reqSuccess) {
        console.log(response.data.allPasswords);
        setAllPasswords(response.data.allPasswords);
      } else {
        console.error(`Failed to fetch all passwords: ${response.data.error}`);
      }
    } catch (err) {
      console.error(`Error fetching all passwords: ${err}`);
    }
  }

  useEffect(() => {
    console.log(localStorage.getItem("token"));
    getAllPasswords();
  }, []);

  return (
    <>
      <AllPasswordsContext.Provider value={{allPasswords, setAllPasswords}}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="/" element={<Template />}>
              <Route index path="home" element={<AllPasswords getAllPasswords={getAllPasswords} />} />
              <Route path="editPassword/:id" element={<EditPassword title={"Edit/View Password"} />} />
              <Route path="createPassword" element={<EditPassword title={"Create Password"} />} />
            </Route>
          </Routes>
        </BrowserRouter> 
      </AllPasswordsContext.Provider>
    </>
  )
}

export default AuthRoutes
