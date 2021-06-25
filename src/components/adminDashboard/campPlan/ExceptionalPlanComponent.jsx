import { useEffect, useState } from "react"
import {ApiServices} from "../../../API/ApiServices";
import { Link, useParams } from "react-router-dom";
import {Table} from "react-bootstrap";

export default function ExceptionalPlanComponent(){
    let { id } = useParams();
    let {date} = useParams();
    
    const[ exceptionalUsers, setExceptionalUsers]= useState([]);
    useEffect(()=>{
        ApiServices.getExceptionalUsers().then((data)=>{
            setExceptionalUsers(data.data)
        })
        .catch(err=>{
            console.log(err);
        })
    },[])
    return(
        <>
        <div className="container">
        <div className="row justify-content-center mt-4">
          <div className="col-md-8">
            <Table striped bordered hover variant="dark">
              <thead>
                <tr style={{ textAlign: "center", fontSize: "40px" }}>
                  <th>Exceptional Users In This Camp</th>
                </tr>
              </thead>
              <tbody>
              {
            exceptionalUsers.length >0 &&
            exceptionalUsers.map(user=>  (
                <tr className="text-center">
                    <td>
                <Link
                    className="nav-link"
                    to={`/admin/camp/${id}/plan/${date}/exceptional/${user._id}`}
                >
                    {user.firstname + " " + user.lastname}
                </Link>
                </td>
                </tr>)
                 )
        }
              </tbody>
            </Table>
          </div>
        </div>

      
        </div>
        </>
    )
}