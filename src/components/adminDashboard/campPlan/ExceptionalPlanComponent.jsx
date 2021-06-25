import { useEffect, useState } from "react"
import {ApiServices} from "../../../API/ApiServices";
import { Link, useParams } from "react-router-dom";

export default function ExceptionalPlanComponent(){
    let { id } = useParams();
    let {date} = useParams();
    
    const[ exceptionalUsers, setExceptionalUsers]= useState([]);
    useEffect(()=>{
        ApiServices.getExceptionalUsers(id).then((data)=>{
            // alert(JSON.stringify(data.data))
            setExceptionalUsers(data.data.users)
        })
        .catch(err=>{
            console.log(err);
        })
    },[])
    return(
        <>
        <div className="container">

        <h1> Exceptional Users In This Camp</h1>
        {
            exceptionalUsers.length >0 &&
            exceptionalUsers.map(user=>  (
                <Link
                    className="nav-link"
                    to={`/admin/camp/${id}/plan/${date}/exceptional/${user._id}`}
                >
                    {user.firstname + " " + user.lastname}
                </Link>)
                 )
        }
        </div>
        </>
    )
}