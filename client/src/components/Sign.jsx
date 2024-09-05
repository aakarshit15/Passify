import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../contexts/UserContext';

const Sign = () => {

  const {user, setUser} = useContext(UserContext);

  const [sign, setSign] = useState("up");
  const [formData, setFormData] = useState({type: "up", name:"", email:"", password:""});
  const [disable, setDisable] = useState(true);

  const toogleSign = () => {
    setSign(sign === "up" ? "in" : "up");

  }

  const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value});
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    if(formData.type === "up") {
        const response = await axios.post("http://localhost:3000/register", formData);
        if(response.data.reqSuccess) {
            console.log("Registration Successful");
            setSign("in");
        } else {
            console.log("Registartion not successful");
        }
    } else {
        const response = await axios.post("http://localhost:3000/login", formData);
        if(response.data.reqSuccess) {
            console.log("Login Successful");
            setUser(response.data.user);
            localStorage.setItem("token", response.data.token);
        } else {
            console.log("Login not successful");
        }
    }
  }

  useEffect(() => {
    setFormData({email: "", password: "", type: sign, name: (sign==="in" ? null : formData.name)});
  }, [sign]);

  useEffect(() => {
    if(formData.sign === "up") {
        if(formData.name.length === 0 || formData.email.length === 0 || formData.password.length === 0) {
            setDisable(true);
        } else {
            setDisable(false);
        }
    } else {
        if(formData.email.length === 0 || formData.password.length === 0) {
            setDisable(true);
        } else {
            setDisable(false);
        }
    }
  }, [formData]);

  return (
    <>
        <h1 className="font-bold text-4xl text-center mb-10">Sign {sign} Form</h1>
        <form className={`flex flex-col justify-center items-center gap-5`}>
            <div className={`input-div ${sign==="in" && "hidden"} flex justify-between items-center gap-5`}>
                <label htmlFor="name">Name: </label>
                <input onChange={(event) => {handleChange(event)}} className='border-2 p-1 border-black rounded-md' id="name" name="name" type="text" required />    
            </div>
            <div className="input-div flex justify-between items-center gap-5">
                <label htmlFor="email">E-mail: </label>
                <input onChange={(event) => {handleChange(event)}} className='border-2 p-1 border-black rounded-md' id="email" name="email" type="email" required />    
            </div>
            <div className="input-div flex justify-between items-center gap-5">
                <label htmlFor="password">Password: </label>
                <input onChange={(event) => {handleChange(event)}} className='border-2 p-1 border-black rounded-md' id="password" name="password" type="password" required />    
            </div>
            <div className="submit-div">
                <button onClick={(event) => {!disable && handleSubmit(event)}} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${disable && "opacity-70"}`} type="submit">Submit</button>
            </div>
            <div className="toogle-sign-div" onClick={() => toogleSign()}>
                <u className='cursor-pointer'>Already have an account?</u>
            </div>
        </form> 
    </>
  )
}

export default Sign
