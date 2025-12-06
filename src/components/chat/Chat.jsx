import React, { useEffect, useRef, useState } from 'react'
import "./chat.css";
import EmojiPicker from 'emoji-picker-react';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from "../../services/firebase"
import { useChatStore } from '../../services/chatStore';
import { useUserStore } from '../../services/userStore';

export default function Chat() {
  const [chat, setChat] = useState([]);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [img, setImage] = useState({
    file: null,
    url:"",
  });

  const { currentUser } = useUserStore()
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore()

  const endRef = useRef(null)
  
  useEffect(() =>{
  endRef.current?.scrollIntoView({ behavior:"smooth" })
  }, [])

  useEffect(()=>{
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) =>{
      setChat(res.data())
    })

    return () =>{
      unSub();
    }
  }, [chatId])

 
  const handleEmoji = (e) =>{
     setText(prev => prev + e.emoji)
     setOpen(false)
  }

  const handleImage = e =>{
    if(e.target.files[0]){

        setImage({
            file:e.target.files[0],
            url: URL.createObjectURL(e.target.files[0])
        })
    }
}

  const handleSend = async () =>{
    if(text === "") return;

    let imgUrl = null;

    try {
      if(img.file){
        imgUrl = await upload(img.file)
      }

      await updateDoc(doc(db, "chats", chatId),{
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && {img:imgUrl})
        })
      })


      const userIDs = [currentUser.id, user.id];


      userIDs.forEach( async (id) =>{

      const userChatsRef = doc(db, "userchats", id)
      const userChatsSnapshot = await getDoc(userChatsRef)

      if(userChatsSnapshot.exists()){
        const userChatsData = userChatsSnapshot.data()

        const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId)

        userChatsData.chats[chatIndex].lastMessage = text;
        userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
        userChatsData.chats[chatIndex].updatedAt = Date.now();

        await updateDoc(userChatsRef, {
          chats: userChatsData.chats,
        })
      }
    })
      
    } catch (error) {
      console.log(error)
      
    }

    setImage({
      file:null,
      url:""
    })

    setText("")
  }


  return (
    <div className='chat'>
      <div className="top">
        <div className="user">

        {user?.avatar ? (
                  <img 
                    src={user?.avatar}                    
                    
                  />
                ) : (
                  <div className='opImage'>
                  <p>{user?.username?.charAt(0).toUpperCase()} </p> 
                  </div>
                )}

          {/* <img src="./avatar.png" alt="" /> */}

          <div className="texts">
            <span>{user?.username}</span>
            <p>{user?.info}</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>

      {/* chat section */}

      <div className="center">
                
        {  chat?.messages?.map(message => (

          <div className={message?.senderId === currentUser?.id ? "message own" : "message"} key={message?.createdAt}>
          <div className="texts">
            { message.img && 
            <img src={message.img} alt="" />
            }
            <p>{message.text}</p>
            {/* <span>{message.createdAt}</span> */}
          </div>
        </div>
        ))
        }

       { img.url && <div className="message own">
          <div className="texts">
            <img src={img.url} alt="" />
          </div>
        </div>}
        
        
        

        {/* autoscroll */}
        <div ref={endRef}></div>

      </div>


{/* bottomsection */}
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
          <img src="./img.png" alt="" />
          </label>
          <input type="file" id='file' style={{ display:"none" }} onChange={handleImage}/>
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input type="text" 
        placeholder={(isCurrentUserBlocked || isReceiverBlocked) ? 'You cannot send a message' : "Type a message..."}
        value={text} 
        onChange={e => setText(e.target.value)}
        disabled={isCurrentUserBlocked || isReceiverBlocked}
         />
        <div className="emoji">
          <img src="./emoji.png" alt=""  
          onClick={() => setOpen(prev => !prev)}
          />
          <div className="picker">
           <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
          </div>
        </div>
        <button className='sendButton' onClick={handleSend} disabled={isCurrentUserBlocked || isReceiverBlocked}>Send</button>
      </div>
    </div>
  )
}
