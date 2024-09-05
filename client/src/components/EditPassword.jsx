import React, { useContext, useEffect, useState } from 'react'
import AllPasswordsContext from '../contexts/AllPasswordsContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const EditPassword = (props) => {

  const {allPasswords, setAllPasswords} = useContext(AllPasswordsContext);

  const [passVisible, setPassVisible] = useState(false);

  const tooglePassVisibile = () => {
    setPassVisible(!passVisible);
  }

  const {id} = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({name: "", password: "", tags: ""});

  const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value});
  }

  const handleDiscard = (event) => {
    event.preventDefault();
    navigate("/");
  }

  const handleSave = async (event) => {
    event.preventDefault();
    if(props.title === "Edit/View Password") {
      const response = await axios.patch(`http://localhost:3000/updatePassword/${id}`, formData, { headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} });
      if(response.data.reqSuccess) {
        navigate("/");
      } else {
        window.alert("Password not updated.");
      }
    } else {
      const response = await axios.post(`http://localhost:3000/createPassword`, formData, { headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} });
      if(response.data.reqSuccess) {
        navigate("/");
      } else {
        window.alert("Password not created.");
      }
    }
  }

  useEffect(() => {
    console.log("useEffect")
    console.log(props.title)
    if(props.title === "Edit/View Password") {
      console.log(allPasswords)
      allPasswords.map((password) => {
        console.log(id)
        if(password._id === id) {
          setFormData({...password, tags: password.tags.join(" ")});
        }
      });
    }
  }, []);

  return (
    <>
      <div className="edit-view-div flex flex-col justify-center items-center gap-8">
        <div className="form-title font-bold text-4xl">{props.title}</div>
        <form className="edit-view-form flex flex-col gap-3">
          <div className="input-div flex flex-row justify-between items-center gap-5">
            <label className="text-xl" htmlFor="name">Name: </label>
            <input required onChange={(event) => {handleChange(event)}} className="border-2 border-black rounded-md p-1 min-h-12" type="text" id="name"  name="name" value={formData.name} />
          </div>
          <div className="input-div flex justify-between items-center gap-5">
            <label className="text-xl" htmlFor="password">Password: </label>
            <div className="password-input border-2 border-black rounded-md flex max-w-48 gap-2">
              <input required onChange={(event) => {handleChange(event)}} className="p-1 rounded-md" type={passVisible ? "text" : "password"} id="password" name="password" value={formData.password} />
              <img onClick={() => {tooglePassVisibile()}} className="w-12 p-2 cursor-pointer" src="https://www.svgrepo.com/show/353106/eye.svg" alt="Password Eye Icon" />
            </div>
          </div>
          <div className="input-div flex justify-between items-center gap-5">
            <label className="text-xl" htmlFor="tags">Tags: </label>
            <input required onChange={(event) => {handleChange(event)}} className="border-2 border-black rounded-md p-1 min-h-12" type="text" id="tags" name="tags" value={formData.tags} />
          </div>
          <div className="input-note-div flex flex-col">
            <span className="input-note opacity-50 text-xl">To add multiple tags add a space.</span>
            <span className="input-note opacity-50 text-xl">Each tag can only be 10 characters long.</span>
          </div>
          <div className="btn-div flex justify-between">
            <button onClick={(event) => {handleDiscard(event)}} className="dis-save-btn bg-red-500 p-4 rounded-md w-28 text-xl">Discard</button>
            <button onClick={(event) => {handleSave(event)}} className="dis-save-btn bg-green-500 p-4 rounded-md w-28 text-xl" type="submit">Save</button>
          </div>
        </form>
    </div>
    </>
  )
}

export default EditPassword