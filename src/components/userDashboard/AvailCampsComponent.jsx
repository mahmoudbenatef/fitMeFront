import {useContext, useEffect, useState, useReducer} from "react";
import {ApiServices} from "../../API/ApiServices";
import {mySessionStorage} from "../../helper/LocalStorge";
import { Table, Button } from "react-bootstrap";


export default function AvailCampsComponent (){
    const[camps,setCamps]=useState([])
    const [refresh, setRefresh]= useState(0)
    console.log(camps)
    useEffect(()=>{
        ApiServices.getAvailCamps().then((data)=>{
            setCamps(data.data)

        }).catch((err)=>{
            console.log(err)
        })
    },[refresh])
    function  registerOnCamp(campID){
        ApiServices.addUsersTocamp(campID,mySessionStorage.getCurrentUser()._id)
            .then((data)=>{
                setRefresh(refresh+1)
            })
            .catch((err)=>{
                console.log(err)
            })
    }
    return (
        <>
            <div className="row justify-content-center mt-4  "  >
                <div className="col-md-8 " style={{color:"white"}}>
                    <Table striped bordered hover variant="dark" style={{textAlign:"center"}}>
                        <caption>List of camps</caption>
                        <thead key={-1}>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Camp</th>
                            <th  scope="col">
                                Register on camps
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                        camps.length > 0 ?
                            camps.map((camp,index)=>{
                                return ( <tr>
                                            <td>{index+1}</td>
                                            <td>{new Date(camp.date).toLocaleDateString()}</td>
                                            <td> <button className={"btn btn-light"}  disabled={camp.users.indexOf(mySessionStorage.getCurrentUser()._id) != -1} onClick={()=>{
                                                registerOnCamp(camp._id)
                                            }}>
                                                {
                                                    (camp.users.indexOf(mySessionStorage.getCurrentUser()._id) != -1)? <span>Already on camp</span> :<span>Add me</span>
                                                }
                                            </button>
                                            </td>

                                           </tr>

                                )
                            }):
                            <tr><td colSpan={2}>No data</td></tr>
                        }
                        </tbody>
                    </Table>
                </div>
            </div>

                        </>
    )
}
