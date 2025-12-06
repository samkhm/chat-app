import React from 'react'
import "./userInfo.css"
import { useUserStore } from "../../../services/userStore";

export default function UserInfo() {

const { currentUser } = useUserStore()

  return (
    <div className='userInfo'>
      <div className="user">
      {currentUser.avatar ? (
      <img 
        src={currentUser.avatar}
        
        
      />
    ) : (
      <div className='opImage'>
       <p>{currentUser.username?.charAt(0).toUpperCase()} </p> 
      </div>
    )}


        {/* <img src={currentUser.avatar} alt="" /> */}

        <h2>{currentUser.username}</h2>
      </div>
      <div className="icons">
        <img src="./more.png" alt="" />
        <img src="./video.png" alt="" />
        <img src="./edit.png" alt="" />
      </div>
    </div>
  )
}
