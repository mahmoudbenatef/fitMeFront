import Conversations from "./conversations/Conversations";
import "./Messenger.css";
import Chat from "../chat/Chat.jsx";
import Users from "../users/Users"
import { useEffect, useRef, useState } from "react";
import {io} from "socket.io-client";
import { mySessionStorage } from "../../../helper/LocalStorge";
export default function Messenger(){
    const [currentConversation, setCurrentConversation] = useState({}) 
    const [conversations,setConversations]= useState([]);

    // const [socket ,setSocket]=useState(null)
    const socket = useRef(io("ws://localhost:8900"))
    const [newMessage, setNewMessage] = useState(0)
    // useEffect(()=>{
    //     setSocket()
    // },[])
    useEffect(()=>{
        socket.current.on("you got new Message", ()=>{
            setNewMessage(newMessage+1)
        })
        socket.current.emit("addUser",mySessionStorage.getCurrentUser()._id)
        socket.current.on("getUsers",users=>{
            console.log(users);

        })
    },[socket])
    return(
        <>
        <div className="messanger">

            <div className="conversations-wrapper">
                <Conversations conversations={conversations} setConversations={setConversations} setCurrentConversation= {setCurrentConversation}/>

            </div>
            <div className="chat-wrapper">
        <Chat currentConversation={currentConversation} newMessage={newMessage}  socket={socket}/>
            </div>

            <div className="users-wrapper">
    <Users conversations={conversations} setCurrentConversation={setCurrentConversation} />            
            </div>
        </div>
        </>
    )
}