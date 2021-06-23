import {useState, useEffect, useContext} from "react"
import {ApiServices} from "../../../API/ApiServices";
import {campContext} from "../../../contexts/campContext";
import ErrorComponent from "../../reusableComponents/ErrorComponent";

export default function ({camp, setCamp}) {
    const cmpContext = useContext(campContext)
    const [errorMsg, setErrorMsg] = useState('')
    const [editedcamp, setEditedCamp] = useState(0)

    useEffect(() => {
        setErrorMsg("")
    }, [
        camp.value.date
    ])



    
    useEffect(() => {
        let temp = {...camp}
        temp.value.date = ''
        temp.status='add'
        setCamp(temp)

    }, [cmpContext.newOneAdded])

    useEffect(() => {
        if (editedcamp) {
            if (camp.status === 'add') {
                ApiServices.addCamp({date: camp.value.date})
                    .then(function (response) {
                        cmpContext.setNewOneAdded(cmpContext.newOneAdded + 1)
                    }
                    )
                    .catch(err => {
                                 setErrorMsg(err.response.data.err)
                                console.log("holla")
                        }
                    )

             }
             else if (camp.status === 'edit') {
                console.log(camp.value.date, "aaaaaaaaaaaa")
                ApiServices.editCamp(camp.value._id, camp.value.date)
                    .then(function (response) {
                        cmpContext.setNewOneAdded(cmpContext.newOneAdded + 1)
                    })
                    .catch(err => {
                            if ('driver' in err.response.data) {
                                setErrorMsg("category date must be unique ")
                            } else {
                                setErrorMsg(err.response.data.errors.date.message)
                            }
                        }
                    )
            }

    }}, [editedcamp])
    return (
        <>
            <div className="row justify-content-center mt-4 ">
                <div className="col-md-6 ">
                    <input type="date" value={camp.value.date}
                           onChange={(e) => {
                               let temp = {...camp}
                               temp.value.date = e.target.value
                               setCamp(temp)
                           }}
                           className="form-control" placeholder={"camp name"}
                           aria-describedby="emailHelp"/>
                </div>
                <div className="col-md-2">
                    <button className={"btn btn-primary"} onClick={() => {
                        setEditedCamp(editedcamp + 1)
                    }}> {camp.status === 'edit' && <span>Edit </span>} {camp.status === 'add' &&
                    <span>Add </span>}
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-6">
                    {errorMsg !== "" &&
                    <ErrorComponent> {errorMsg}</ErrorComponent>
                    }
                </div>
            </div>

        </>
    )
}
