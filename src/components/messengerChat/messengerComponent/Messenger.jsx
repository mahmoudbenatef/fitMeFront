import Conversations from "./conversations/Conversations";
import "./Messenger.css";
import Chat from "../chat/Chat.jsx";
import { useState } from "react";
export default function Messenger(){
    const [currentConversation, setCurrentConversation] = useState({}) 
    return(
        <>
        <div className="messanger">

            <div className="conversations-wrapper">
                <Conversations setCurrentConversation= {setCurrentConversation}/>

            </div>

            <div className="chat-wrapper">
        <Chat currentConversation={currentConversation}/>
            </div>

            <div className="users-wrapper">
    fdf            
            </div>
        </div>
        </>
    )
}