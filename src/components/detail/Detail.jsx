import React from 'react'
import "./detail.css"
import { auth, db } from '../../services/firebase'
import { useUserStore } from '../../services/userStore'
import { useChatStore } from '../../services/chatStore'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'


export default function Detail() {

  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlocked} = useChatStore();
  const { currentUser } = useUserStore()

  const handleBlock = async () =>{
    if(!user) return;

    const userDocRef = doc(db, "users", currentUser.id)

    try {

      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      })

      changeBlocked()
      
    } catch (error) {
      console.log(error)
      
    }
  }
  return(
    <div className="detail">
      <div className="user">

      {user?.avatar ? (
                  <img 
                    src={user?.blocked.includes(currentUser.id) ? "./avatar.png" : user?.avatar || './avatar.png' }                    
                    
                  />
                ) : (
                  <div className='opImage'>

                  <p>{ user?.blocked.includes(currentUser.id) ? <label style={{ color: "red"}}>X</label>  : user?.username?.charAt(0).toUpperCase()} </p> 

                  </div>
                )}

        {/* <img src="./avatar.png" alt="" /> */}

        <h2>{user?.blocked?.includes(currentUser.id) ? "User" : user?.username}</h2>
        <p>{user?.info}</p>
      </div>

      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
              <div className="photoItem">
                <div className="photoDetail">
                  <img src="https://images.pexels.com/photos/20991850/pexels-photo-20991850.jpeg" alt="" />
                  <span>photo_2025_1.png</span>
                </div>
                <img src="./download.png" alt="" className='icon' />
              </div>
              <div className="photoItem">
                <div className="photoDetail">
                  <img src="https://images.pexels.com/photos/20991850/pexels-photo-20991850.jpeg" alt="" />
                  <span>photo_2025_1.png</span>
                </div>
                <img src="./download.png" alt="" className='icon' />
              </div>
              <div className="photoItem">
                <div className="photoDetail">
                  <img src="https://images.pexels.com/photos/20991850/pexels-photo-20991850.jpeg" alt="" />
                  <span>photo_2025_1.png</span>
                </div>
                <img src="./download.png" alt="" className='icon' />
              </div>
              <div className="photoItem">
                <div className="photoDetail">
                  <img src="https://images.pexels.com/photos/20991850/pexels-photo-20991850.jpeg" alt="" />
                  <span>photo_2025_1.png</span>
                </div>
                <img src="./download.png" alt="" className='icon' />
              </div>
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Shared files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div> 
        <button onClick={handleBlock}>{
          isCurrentUserBlocked ? "You are blocked" : isReceiverBlocked ? "User Blocked" : "Block User"
          }</button>      
        <button className='logout' onClick={() => auth.signOut()}>Logout</button>      
      </div>
    </div>
  )
}
