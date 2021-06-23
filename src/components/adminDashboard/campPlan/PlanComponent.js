import {
    useParams
} from "react-router-dom";
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
            <div className={"container"}>
                <h1>Camp days</h1>

                {
                    camp &&
                    [0, 1, 2, 3, 4, 5, 6].map((numberOfDaysToAdd) => {
                        var someDate = new Date(camp.date);
                        someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
                        return (

                            <Link
                                className="nav-link"
                                to={`/admin/camp/${id}/plan/${someDate}`}
                            >
                                {someDate.toLocaleString()}
                            </Link>
                        )
                    })
                }
            </div>
        </>
    )
}
