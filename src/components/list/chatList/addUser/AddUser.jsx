import React, { useState } from 'react'
import "./addUser.css"
import { db } from "../../../../services/firebase"
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"
import { useUserStore } from "../../../../services/userStore"

export default function AddUser() {

  const [user, setUser] = useState(null)

  const { currentUser } = useUserStore()

  const handleSearch = async e =>{
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username")

    try {
      const userRef = collection(db, "users");
    // Create a query against the collection.
     const q = query(userRef, where("username", "==", username));
     const querySnapShot = await  getDocs(q)     
     if(!querySnapShot.empty){
      setUser(querySnapShot.docs[0].data())
     }
      
    } catch (error) {
      console.log(error)
      
    }
  }


  const handleAdd =  async () =>{

    const chatRef = collection(db, "chats")
    const userChatsRef = collection(db, "userchats")

    try {

   const newChatRef = doc(chatRef)
   
   await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        message: []
      })


      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        })
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        })
      });
      
    } catch (error) {
      console.log(error)
      
    }

  }


  return (
    <div className='addUser'>
        <form onSubmit={handleSearch}>
            <input type="text" placeholder='Username' name='username' />
            <button>Search</button>
        </form>
             
             {
              user && 
             
          <div className="user">
            <div className="detail">

            {user.avatar ? (
                  <img 
                    src={user.avatar}                    
                    
                  />
                ) : (
                  <div className='opImage'>
                  <p>{user.username?.charAt(0).toUpperCase()} </p> 
                  </div>
                )}

                {/* <img src="./avatar.png" alt="" /> */}

                <span>{user.username}</span>
            </div>
            <button onClick={handleAdd}>Add User</button>
          </div>
        }

    </div>
  )
}
