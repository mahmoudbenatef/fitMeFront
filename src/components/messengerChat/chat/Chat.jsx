import { useEffect, useRef, useState } from "react"
import "./Chat.css"
import {ApiServices} from "../../../API/ApiServices";
import {mySessionStorage} from "../../../helper/LocalStorge";
import { BASE_URL } from "../../../API//urls";

export default function Chat({currentConversation,socket,newMessage}) {
    console.log(JSON.stringify(currentConversation))
    const[messageAdded , setMessageAdded]=useState(0)
    const[messages, setMessages] = useState([])
    const [message, setMessage] =  useState("")
    const scrollRef = useRef();
    useEffect(()=>{
        const getMessages = async()=>{
        const {data:data} = await ApiServices.getMessages(currentConversation._id)
        // alert(JSON.stringify(data))
        setMessages(data)    
        }
         currentConversation? getMessages(): console.log("none");
    },[currentConversation,messageAdded, newMessage] )
    useEffect(()=>{
        scrollRef?.current?.scrollIntoView({behavior:"smooth"})
    },[messages])
    function sendMessage(){
        const otherUser = currentConversation.users.filter(user => user._id !== mySessionStorage.getCurrentUser()._id)[0]
        ApiServices.sendMessage({sender:mySessionStorage.getCurrentUser()._id,receiver:otherUser._id, conversation:currentConversation._id,message}).then(()=> {
            setMessageAdded(messageAdded+1)
            setMessage("")
            console.log(socket);
            socket.current.emit("newMessage",otherUser._id)
        }).catch((err)=>{})
    }
    return (
        <>
         {
           currentConversation && currentConversation.users&&   [currentConversation.users.filter(user => user._id !== mySessionStorage.getCurrentUser()._id)[0]].map(user=> 
                (<h1>{user.firstname + " "+ user.lastname }</h1>))

            } 
                <div className="messages">

        {
            messages.map(message=>(
                <>
                    <div ref={scrollRef} className={message.sender._id === mySessionStorage.getCurrentUser()._id?"sender":"receiver"}>

                <span >{message.message}</span>
                {
                    message.sender._id !== mySessionStorage.getCurrentUser()._id?
                    <img
                className={"conversation-img"}
               style={{ borderRadius: "2rem", marginLeft:"6px"}}
               src={BASE_URL + "/" + message.sender.avatar}
               height="40"
               width="40"
               alt=""
             /> :
             <></>
                }
                    </div>
             </>
                ))
        }
        </div>
        <div>
        <input  value={message} onChange={(e)=>setMessage(e.target.value)} className={"form-control send-message-input "} type="text" />
            <button className={"send-message-button btn btn-primary"} onClick={sendMessage}>Send</button>
        </div>

        </>
    )
}