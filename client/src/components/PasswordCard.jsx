import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const PasswordCard = (props) => {

  const navigate = useNavigate();

  const handleDelete = async (event) => {
    event.preventDefault();
    const response = await axios.delete(`http://localhost:3000/deletePassword/${props.password._id}`, { headers: {'Authorization' : `Bearer ${localStorage.getItem("token")}`} });
    console.log(response.data.reqSuccess);
    if(response.data.reqSuccess) {
      navigate("/");
    } else {
      window.alert("Password not deleted.");
    }
  }

  const handleEdit = async (event) => {
    event.preventDefault();
    navigate(`/editPassword/${props.password._id}`);
  }

  useEffect(() => {
    console.log(props.password);
  }, [])

  return (
    <>
      <div className="pass-card flex flex-col gap-2 border-2 border-black rounded-xl w-96 p-2">
        <div className="pass-card-head flex justify-between align-middle border-b-2 pb-2">
          <h2 className="pass-title font-bold text-4xl">{props.password.name}</h2>
          <div className="edit-del-div flex justify-center items-center gap-4">
            <button onClick={(event) => handleEdit(event)} className="edit-del-btn">
              <img className="edit-icon w-8" src="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png" alt="edit button" />
            </button>
            <button onClick={(event) => handleDelete(event)} className="edit-del-btn">
              <img className="del-icon w-6" src="https://icons.iconarchive.com/icons/fa-team/fontawesome/256/FontAwesome-Trash-Can-icon.png" alt="delete button" />
            </button>
          </div>
        </div>
        <div className="pass-card-tags my-2 flex flex-wrap gap-2">
          {
            props.password.tags.map((tag, index) => {
              return <div key={index} className="tag-div flex justify-around items-center gap-2 border-2 p-1 rounded-full min-w-16">
                <span className="tag-title flex justify-center items-center text-xs">{tag}</span>
                {/* <span className="tag-del flex justify-center items-center w-3 h-3">
                  <img className="w-3 h-3" src="https://icons.veryicon.com/png/o/miscellaneous/medium-thin-linear-icon/cross-23.png" alt="cross icon" />
                </span> */}
              </div>
            })
          }
        </div>
      </div>
    </>
  )
}

export default PasswordCard
