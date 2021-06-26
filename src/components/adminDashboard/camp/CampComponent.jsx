import { useState } from "react";
import  EditAndCampConponent from "./EditAndCampConponent";
import ListCampsComponent  from "./ListCampsComponent";

export default function CampComponent () {
    const [editOrCreate, setEditOrCreate] = useState({status: 'create'})
    const [camp, setCamp] = useState({status: 'add', value: {date: ''}})
    return (
        <>
        <h1 style={{textAlign:"center",marginTop:"3rem"}}> Camps </h1>
        <div className={"d-flex flex-column align-items-center  "}>
            <div className="row justify-content-center w-100 p-3 rounded-3">
                <div className="row justify-content-center mt-5 flex-xl-shrink-2">
                    <EditAndCampConponent camp={camp} setCamp={setCamp}/>
                    <ListCampsComponent  changeState={setCamp}/>
                </div>
            </div>
        </div>
        </>
    )
}
