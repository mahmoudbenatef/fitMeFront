import { BASE_URL } from "../../../../API//urls";
import { useEffect, useState } from "react"
import "./Conversations.css"
import { mySessionStorage } from "../../../../helper/LocalStorge";

import {ApiServices} from "../../../../API/ApiServices";

export default function Conversations({setCurrentConversation}){
    const [conversations,setConversations]= useState([]);
    // const [currentChat, setCurrentChat] = useState({});
    useEffect( ()=>{
        
   const getConversations = async ()=> {
    const {data:data} =  await  ApiServices.getConversations(mySessionStorage.getCurrentUser()._id)
    setConversations(data);
    
    data.length>0?setCurrentConversation(data[0]): console.log('aa'); ;
    }
    getConversations();

    },[])

    return(
        <>
        <h2>Conversations</h2>
        <div className="conversations">

        {
            conversations.length >0 &&
            conversations.map(conversation => {
                console.log(conversation.users);

                const user = conversation.users.filter(user => user._id !== mySessionStorage.getCurrentUser()._id)[0]

                return   ( 
                <>   
                <div className={"conversation"} onClick={()=>setCurrentConversation(conversation)}>

                 <img
                 className={"conversation-img"}
                style={{ borderRadius: "2rem" }}
                src={BASE_URL + "/" + user.avatar}
                height="40"
                width="40"
                alt=""
              />  <span className={"name"}>{user.firstname+ " " + user.lastname} </span>
                </div>
              
              </>)

            }
            )
        }
        </div>
        </>
    )
}