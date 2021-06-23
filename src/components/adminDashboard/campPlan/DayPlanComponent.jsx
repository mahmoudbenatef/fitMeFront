import {
    useParams
} from "react-router-dom";
import { useEffect, useState } from "react";

// camp/:campID/plan/:date
export default function DayPlanComponent(){
    let { id } = useParams();
    let {date} = useParams();
    
    return (
        <h1>{date}</h1>
    )
}