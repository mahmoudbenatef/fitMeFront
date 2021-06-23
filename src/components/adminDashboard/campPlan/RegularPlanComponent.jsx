import { useEffect } from "react";
import {
    useParams
} from "react-router-dom";
import {ApiServices} from "../../../API/ApiServices";

export default function RegularPlanComponent(){
    let { id } = useParams();
    let {date} = useParams();
    useEffect(()=>{
        ApiServices.getBreakfast().then(()=>{}).catch((err)=>{})

    },[])
    useEffect(()=>{
        ApiServices.getLaunch().then(()=>{}).catch((err)=>{})

    },[])
    useEffect(()=>{
        ApiServices.getDinner().then(()=>{}).catch((err)=>{})

    },[])
    return(
        <>
        <h2>Breakfast</h2>
        <input type="text" />

        <h2>Launch</h2>
        <input type="text" />

        <h2>Dinner</h2>
        <input type="text" />

        <h2>Activity 1</h2>
        <input type="text" />


        <h2>Activity 2</h2>
        <input type="text" />


        <h2>Activity 3</h2>
        <input type="text" />
        </>
    )
}