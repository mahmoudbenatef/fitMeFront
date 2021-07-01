import { useEffect, useState } from "react"
import "./Users"
import { mySessionStorage } from "../../../helper/LocalStorge";

import {ApiServices} from "../../../API/ApiServices";

export default function Users({conversations,setCurrentConversation}){
    const [users, setUsers]= useState([])
    useEffect(()=>{
        const getUsers = async()=>{
           const {data:data} = await ApiServices.getUsers();
           setUsers(data);
        }
        getUsers();
    },[])
    function handleUserClicked(user){
        const conversation = conversations.filter(conversation => conversation.users.filter(currUser => currUser._id === user._id).length>0)[0]
        if(conversation)
         setCurrentConversation(conversation)
    }
    return (
        <>
        <h1>Users</h1>
        {
           users && users.filter(user => user._id !== mySessionStorage.getCurrentUser()._id)
           .map(user=>(
                <h2 onClick={()=>{handleUserClicked(user)}}>{`${user.firstname }  ${user.lastname}`}</h2>
            ))
        }
        </>
    )
}