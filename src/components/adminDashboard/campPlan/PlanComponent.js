import {
    useParams
} from "react-router-dom";
import { Table } from "react-bootstrap";

import { useEffect, useState } from "react";
import { ApiServices } from "../../../API/ApiServices"
import { Link } from "react-router-dom";
export default function PlanComponent() {
    const [camp, setCamp] = useState(null)
    let { id } = useParams();
    useEffect(() => {
        ApiServices.getCamp(id)
            .then((data) => {
                console.log(data)
                setCamp(data.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <div>
                <div className="row justify-content-center mt-4 ">
                    <div className="col-md-8 ">
                        <Table striped bordered hover variant="dark" className={"mt-5"}>
                            <thead key={-1}>
                                <tr style={{ textAlign: "center", fontSize: "40px" }}>
                                    <th scope="col">Camp Days</th>

                                </tr>
                            </thead>
                            <tbody>


                                {
                                    camp &&
                                    [0, 1, 2, 3, 4, 5, 6].map((numberOfDaysToAdd) => {
                                        var someDate = new Date(camp.date);
                                        someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
                                        return (
                                            <tr key={numberOfDaysToAdd}>
                                                <td style={{ textAlign: "center" }}>

                                                    <Link style={{ color: "white" }}
                                                        className="nav-link"
                                                        to={`/admin/camp/${id}/plan/${someDate}`}
                                                    >
                                                        {someDate.toLocaleDateString()}
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    )
}
