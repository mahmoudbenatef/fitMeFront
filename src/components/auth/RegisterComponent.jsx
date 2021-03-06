import axios from "axios";
import {useContext, useEffect, useReducer, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {API} from "../../API/urls";
import bg from "../../assets/bck1.jpg";
import {authContext} from "../../contexts/authContext";
import {validateAllInputs} from "../../helper/validateFormErrors";
import ErrorComponent from "../reusableComponents/ErrorComponent";

export default function RegisterComponent({parent}) {
    const authentication = useContext(authContext);
    const history = useHistory();
    const [user, setUser] = useReducer(
        (oldstate, updates) => ({...oldstate, ...updates}),
        {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirm_password: "",
            gender: "",
            avatar: null,
            phone: "",
            nationality: "",
            countryOfResidence: "",
            address: "",
            NationalIdOrPassportNo: "",
            weight: undefined,
            height: undefined,
            basalMetabolicRate: undefined
        }
    );
    const [userErrors, setUserErrors] = useReducer(
        (oldstate, updates) => ({...oldstate, ...updates}),
        {
            firstname: {
                isValid: false,
                isTouched: false,
                errorMsg: "Firstname must be more than 2 characters",
            },
            lastname: {
                isValid: false,
                isTouched: false,
                errorMsg: "Lastname must be more than 2 characters",
            },
            email: {
                isValid: false,
                isTouched: false,
                errorMsg: "Email must be in a valid format",
            },
            password: {
                isValid: false,
                isTouched: false,
                errorMsg: "Password must be at least 6 characters",
            },
            confirm_password: {
                isValid: false,
                isTouched: false,
                errorMsg: "Confirm password must be identical to your password",
            },
            gender: {
                isValid: false,
                isTouched: false,
                errorMsg: "Gender is required",
            },

            phone: {
                isValid: false,
                isTouched: false,
                errorMsg: "phone is required",
            },


            nationality: {
                isValid: false,
                isTouched: false,
                errorMsg: "nationality is required",
            },

            countryOfResidence: {
                isValid: false,
                isTouched: false,
                errorMsg: "country Of Residence is required",
            },

            address: {
                isValid: false,
                isTouched: false,
                errorMsg: "address is required",
            },
            weight: {
                isValid: false,
                isTouched: false,
                errorMsg: "weight is required",
            },
            NationalIdOrPassportNo: {
                isValid: false,
                isTouched: false,
                errorMsg: "National ID Or Passport No is required",
            },
            height: {
                isValid: false,
                isTouched: false,
                errorMsg: "height is required",
            },
            basalMetabolicRate: {
                isValid: false,
                isTouched: false,
                errorMsg: "basal Metabolic Rate is required",
            },

            avatar: {
                isValid: false,
                isTouched: false,
                errorMsg: "Avatar is required",
            },
        }
    );
    const [serverError, setServerError] = useState("");

    const [registerPressed, setRegisterPressed] = useState(0);

    // validate effect
    useEffect(() => {
        setServerError("");
        setUserErrors({
            firstname: {...userErrors.firstname, isTouched: false},
            lastname: {...userErrors.lastname, isTouched: false},
            email: {...userErrors.email, isTouched: false},
            password: {...userErrors.password, isTouched: false},
            confirm_password: {...userErrors.confirm_password, isTouched: false},
            gender: {...userErrors.gender, isTouched: false},
            phone: {...userErrors.phone, isTouched: false},
            nationality: {...userErrors.nationality, isTouched: false},
            countryOfResidence: {...userErrors.countryOfResidence, isTouched: false},
            address: {...userErrors.address, isTouched: false},
            NationalIdOrPassportNo: {...userErrors.NationalIdOrPassportNo, isTouched: false},
            weight: {...userErrors.weight, isTouched: false},
            height: {...userErrors.height, isTouched: false},
            basalMetabolicRate: {...userErrors.basalMetabolicRate, isTouched: false},
            avatar: {...userErrors.avatar, isTouched: false},
        });
        // console.log(userErrors)
        if (user.firstname !== "" && user.firstname.length > 2) {
            setUserErrors({firstname: {...userErrors.firstname, isValid: true}});
        } else if (user.firstname !== "") {
            setUserErrors({
                firstname: {...userErrors.firstname, isValid: false, isTouched: true},
            });
        }

        if (user.lastname !== "" && user.lastname.length > 2) {
            setUserErrors({lastname: {...userErrors.lastname, isValid: true}});
        } else if (user.lastname !== "") {
            setUserErrors({
                lastname: {...userErrors.lastname, isValid: false, isTouched: true},
            });
        }

        if (
            user.email !== "" &&
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                user.email
            )
        ) {
            setUserErrors({email: {...userErrors.email, isValid: true}});
        } else if (user.email !== "") {
            setUserErrors({
                email: {...userErrors.email, isValid: false, isTouched: true},
            });
        }
        if (user.password !== "" && user.password.length > 5) {
            setUserErrors({password: {...userErrors.password, isValid: true}});
        } else if (user.password !== "") {
            setUserErrors({
                password: {...userErrors.password, isValid: false, isTouched: true},
            });
        }

        if (user.confirm_password === user.password) {
            setUserErrors({
                confirm_password: {...userErrors.confirm_password, isValid: true},
            });
        } else if (user.confirm_password !== user.password) {
            setUserErrors({
                confirm_password: {
                    ...userErrors.confirm_password,
                    isValid: false,
                    isTouched: true,
                },
            });
        }

        if (user.gender !== "") {
            setUserErrors({gender: {...userErrors.gender, isValid: true}});
        } else if (user.gender === "") {
            setUserErrors({gender: {...userErrors.gender, isValid: false}});
        }

        if (user.phone !== "") {
            setUserErrors({phone: {...userErrors.phone, isValid: true}});
        } else if (user.phone === "") {
            setUserErrors({phone: {...userErrors.phone, isValid: false}});
        }
        if (user.nationality !== "") {
            setUserErrors({nationality: {...userErrors.nationality, isValid: true}});
        } else if (user.nationality === "") {
            setUserErrors({nationality: {...userErrors.nationality, isValid: false}});
        }

        if (user.countryOfResidence !== "") {
            setUserErrors({countryOfResidence: {...userErrors.countryOfResidence, isValid: true}});
        } else if (user.countryOfResidence === "") {
            setUserErrors({countryOfResidence: {...userErrors.countryOfResidence, isValid: false}});
        }
        if (user.address !== "") {
            setUserErrors({address: {...userErrors.address, isValid: true}});
        } else if (user.address === "") {
            setUserErrors({address: {...userErrors.address, isValid: false}});
        }
        if (user.NationalIdOrPassportNo !== "") {
            setUserErrors({NationalIdOrPassportNo: {...userErrors.NationalIdOrPassportNo, isValid: true}});
        } else if (user.NationalIdOrPassportNo === "") {
            setUserErrors({NationalIdOrPassportNo: {...userErrors.NationalIdOrPassportNo, isValid: false}});
        }
        if (user.weight !== "") {
            setUserErrors({weight: {...userErrors.weight, isValid: true}});
        } else if (user.weight === "") {
            setUserErrors({weight: {...userErrors.weight, isValid: false}});
        }
        if (user.height !== "") {
            setUserErrors({height: {...userErrors.height, isValid: true}});
        } else if (user.height === "") {
            setUserErrors({height: {...userErrors.height, isValid: false}});
        }
        if (user.basalMetabolicRate !== "") {
            setUserErrors({basalMetabolicRate: {...userErrors.basalMetabolicRate, isValid: true}});
        } else if (user.basalMetabolicRate === "") {
            setUserErrors({basalMetabolicRate: {...userErrors.basalMetabolicRate, isValid: false}});
        }

        if (user.avatar !== null) {
            setUserErrors({avatar: {...userErrors.avatar, isValid: true}});
        }
    }, [user]);

    // redirect if authenticated
    useEffect(() => {
        if (
            authentication.auth.authed === true &&
            authentication.auth.role === "admin"
        ) {
            history.push("/admin");
        } else if (
            authentication.auth.authed === true &&
            authentication.auth.role === "user"
        ) {
            history.push("/user");
        }
    }, []);

    // this state for listening for register button
    useEffect(() => {
        if (registerPressed) {
            const {valid, newErrors} = validateAllInputs(userErrors);
            console.log(`Am I valid ${valid}`)
            if (valid) {
                // setRegisterPressed(false)
                console.log("msa2k laziz");
                let formData = new FormData();
                for (const [key, value] of Object.entries(user)) {
                    formData.append(key, value);
                }
                // ApiServices.register(formData)
                axios
                    .post(API.register(), formData)
                    .then(function (response) {
                        history.push("/login");
                    })
                    .catch(function (error) {
                        console.log(error);
                        setServerError("this email has been already taken");
                        setRegisterPressed(false);
                    });
            } else {
                setUserErrors(newErrors);
            }
        }
    }, [registerPressed]);

    return parent === "home" ? (
        <div className={"d-flex flex-column min-vh-100 "}>
            <div className="row  justify-content-center  align-items-baseline">
                <div className="col-md-3 mt-2" style={{textAlign: "right"}}>
                    <label>First name</label>
                </div>
                <div className="col-md-6 mt-2">
                    <input
                        type="text"
                        value={user.firstname}
                        onChange={(e) => {
                            setUser({firstname: e.target.value});
                        }}
                        className="form-control"
                        placeholder={"First name"}
                    />
                </div>
            </div>
            <div className="row justify-content-center mt-1 align-items-baseline">
                <div className="col-md-3" style={{textAlign: "right"}}>
                    <label>
                        Last name
                    </label>
                </div>
                <div className="col-md-6">
                    <input
                        type="text"
                        value={user.lastname}
                        onChange={(e) => {
                            setUser({lastname: e.target.value});
                        }}
                        className="form-control"
                        placeholder={"Last name"}
                    />
                </div>
            </div>
            <div className="row justify-content-center mt-1 mr-1 align-items-baseline">
                <div style={{textAlign: "right"}} className="col-md-3">
                    <label>Email</label>
                </div>
                <div className="col-md-6 ">
                    <input
                        type="email"
                        value={user.email}
                        onChange={(e) => {
                            setUser({email: e.target.value});
                        }}
                        className="form-control"
                        placeholder={"Email"}
                    />
                </div>
            </div>
            <div className="row justify-content-center mt-1 align-items-baseline">
                <div className="col-md-3" style={{textAlign: "right"}}>
                    <label>Password</label>
                </div>
                <div className="col-md-6 ">
                    <input
                        type="password"
                        value={user.password}
                        onChange={(e) => {
                            setUser({password: e.target.value});
                        }}
                        className="form-control"
                        placeholder={"Password"}
                    />
                </div>
            </div>
            <div className="row justify-content-center mt-1 align-items-baseline">
                <div className="col-md-3"></div>
                <div className="col-md-6 ">
                    <input
                        type="password"
                        value={user.confirm_password}
                        onChange={(e) => {
                            setUser({confirm_password: e.target.value});
                        }}
                        className="form-control"
                        placeholder={"Confirm password"}
                    />
                </div>
            </div>
            <div className="row justify-content-center mt-1 align-items-baseline">
                <div className="col-md-3" style={{textAlign: "right"}}>
                    <label>Gender</label>
                </div>
                <div className="col-md-6 ">
                    <select
                        className="form-select"
                        value={user.gender}
                        onChange={(e) => {
                            setUser({gender: e.target.value});
                        }}
                    >
                        <option value={""}> Gender</option>
                        <option value={"Male"}> Male</option>
                        <option value={"Female"}> Female</option>
                    </select>
                </div>
            </div>
            <div className="row justify-content-center mt-1 align-items-baseline">
                <div className="col-md-3" style={{textAlign: "right"}}>
                    <label>Avatar</label>
                </div>
                <div className="col-md-6 ">
                    <input
                        type="file"
                        onChange={(e) => {
                            setUser({avatar: e.target.files[0]});
                        }}
                        className="form-control"
                        placeholder={"password"}
                        aria-describedby="emailHelp"
                    />
                </div>
            </div>
            <div className="row justify-content-center mt-3 align-items-baseline">
                <div className="col-md-6"></div>
                <div className="col-md-6 mb-3">
                    <button
                        type="submit"
                        className="btn align-self-center"
                        style={{
                            backgroundColor: "#3d6b8c",
                            color: "white",
                            width: "8rem",
                        }}
                        onClick={() => {
                            setRegisterPressed(registerPressed + 1);
                        }}
                    >
                        Register
                    </button>
                </div>
            </div>
            <div className="row justify-content-center mt-1 align-items-baseline">
                <div className="col-md-3" style={{textAlign: "right"}}>
                </div>
                <div className="col-md-9 ">
                    {!userErrors.firstname.isValid && userErrors.firstname.isTouched && (
                        <p style={{textAlign: "center", margin: "0", color: "#711D1D"}}>
                            {userErrors.firstname.errorMsg}
                        </p>
                    )}
                    {!userErrors.lastname.isValid && userErrors.lastname.isTouched && (
                        <p style={{textAlign: "center", margin: "0", color: "#711D1D"}}>
                            {userErrors.lastname.errorMsg}
                        </p>
                    )}
                    {!userErrors.email.isValid && userErrors.email.isTouched && (
                        <p style={{textAlign: "center", margin: "0", color: "#711D1D"}}>
                            {userErrors.email.errorMsg}
                        </p>
                    )}
                    {!userErrors.password.isValid && userErrors.password.isTouched && (
                        <p style={{textAlign: "center", margin: "0", color: "#711D1D"}}>
                            {userErrors.password.errorMsg}
                        </p>
                    )}
                    {!userErrors.confirm_password.isValid &&
                    userErrors.confirm_password.isTouched && (
                        <p style={{textAlign: "center", margin: "0", color: "#711D1D"}}>
                            {userErrors.confirm_password.errorMsg}
                        </p>
                    )}
                    {!userErrors.gender.isValid && userErrors.gender.isTouched && (
                        <p style={{textAlign: "center", margin: "0", color: "#711D1D"}}>
                            {userErrors.gender.errorMsg}
                        </p>
                    )}
                    {!userErrors.avatar.isValid && userErrors.avatar.isTouched && (
                        <p style={{textAlign: "center", margin: "0", color: "#711D1D"}}>
                            {userErrors.avatar.errorMsg}
                        </p>
                    )}
                    {serverError !== "" && <p> {serverError}</p>}
                </div>
            </div>
        </div>
    ) : (
        <>
            <div
                className={
                    "d-flex flex-column min-vh-100 align-items-center justify-content-center"
                }
                style={{
                    backgroundImage: `url(${bg})`, backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    width: "100%",
                    margin: "0"
                }}>
                <div className="row justify-content-center w-50 p-3 bg-light rounded-3">
                    <div className="col-md-12 flex-grow-1 p-5 ">
                        <div className="row justify-content-center mt-2">
                            <div className="col-md-8">
                                <h1>Register</h1>
                            </div>
                        </div>

                        <div className="row justify-content-center mt-2">
                            <div className="col-md-8">
                                <input
                                    type="text"
                                    value={user.firstname}
                                    onChange={(e) => {
                                        setUser({firstname: e.target.value});
                                    }}
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    placeholder={"first name"}
                                    aria-describedby="emailHelp"
                                />
                            </div>
                        </div>
                        {!userErrors.firstname.isValid &&
                        userErrors.firstname.isTouched && (
                            <ErrorComponent>
                                {" "}
                                {userErrors.firstname.errorMsg}
                            </ErrorComponent>
                        )}
                        <div className="row justify-content-center mt-2">
                            <div className="col-md-8">
                                <input
                                    type="text"
                                    value={user.lastname}
                                    onChange={(e) => {
                                        setUser({lastname: e.target.value});
                                    }}
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    placeholder={"last name"}
                                    aria-describedby="emailHelp"
                                />
                            </div>
                        </div>

                        {!userErrors.lastname.isValid && userErrors.lastname.isTouched && (
                            <ErrorComponent> {userErrors.lastname.errorMsg}</ErrorComponent>
                        )}

                        <div className="row justify-content-center mt-2">
                            <div className="col-md-8">
                                <input
                                    type="email"
                                    value={user.email}
                                    onChange={(e) => {
                                        setUser({email: e.target.value});
                                    }}
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    placeholder={"email"}
                                    aria-describedby="emailHelp"
                                />
                            </div>
                        </div>

                        {!userErrors.email.isValid && userErrors.email.isTouched && (
                            <ErrorComponent> {userErrors.email.errorMsg}</ErrorComponent>
                        )}

                        <div className="row justify-content-center mt-2">
                            <div className="col-md-8">
                                <input
                                    type="password"
                                    value={user.password}
                                    onChange={(e) => {
                                        setUser({password: e.target.value});
                                    }}
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    placeholder={"password"}
                                    aria-describedby="emailHelp"
                                />
                            </div>
                        </div>

                        {!userErrors.password.isValid && userErrors.password.isTouched && (
                            <ErrorComponent> {userErrors.password.errorMsg}</ErrorComponent>
                        )}

                        <div className="row justify-content-center mt-2">
                            <div className="col-md-8">
                                <input
                                    type="password"
                                    value={user.confirm_password}
                                    onChange={(e) => {
                                        setUser({confirm_password: e.target.value});
                                    }}
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    placeholder={"confirm password"}
                                    aria-describedby="emailHelp"
                                />
                            </div>
                        </div>

                        {!userErrors.confirm_password.isValid &&
                        userErrors.confirm_password.isTouched && (
                            <ErrorComponent>
                                {" "}
                                {userErrors.confirm_password.errorMsg}
                            </ErrorComponent>
                        )}

                        <div className="row justify-content-center mt-2">
                            <div className="col-md-8">
                                <input
                                    type="number"
                                    value={user.phone}
                                    onChange={(e) => {
                                        setUser({phone: e.target.value});
                                    }}
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    placeholder={"phone number"}
                                    aria-describedby="emailHelp"
                                />
                            </div>
                        </div>
                        {!userErrors.phone.isValid &&
                        userErrors.phone.isTouched && (
                            <ErrorComponent>
                                {" "}
                                {userErrors.phone.errorMsg}
                            </ErrorComponent>
                        )}


                        <div className="row justify-content-center mt-2">
                            <div className="col-md-8">
                                <input
                                    type="text"
                                    value={user.nationality}
                                    onChange={(e) => {
                                        setUser({nationality: e.target.value});
                                    }}
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    placeholder={"nationality"}
                                    aria-describedby="emailHelp"
                                />
                            </div>
                        </div>
                        {!userErrors.nationality.isValid &&
                        userErrors.nationality.isTouched && (
                            <ErrorComponent>
                                {" "}
                                {userErrors.nationality.errorMsg}
                            </ErrorComponent>
                        )}


                        <div className="row justify-content-center mt-2">
                            <div className="col-md-8">
                                <input
                                    type="text"
                                    value={user.countryOfResidence}
                                    onChange={(e) => {
                                        setUser({countryOfResidence: e.target.value});
                                    }}
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    placeholder={"country Of Residence"}
                                    aria-describedby="emailHelp"
                                />
                            </div>
                        </div>
                        {!userErrors.countryOfResidence.isValid &&
                        userErrors.countryOfResidence.isTouched && (
                            <ErrorComponent>
                                {" "}
                                {userErrors.countryOfResidence.errorMsg}
                            </ErrorComponent>
                        )}


                        <div className="row justify-content-center mt-2">
                            <div className="col-md-8">
                                <input
                                    type="text"
                                    value={user.address}
                                    onChange={(e) => {
                                        setUser({address: e.target.value});
                                    }}
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    placeholder={"address"}
                                    aria-describedby="emailHelp"
                                />
                            </div>
                        </div>
                        {!userErrors.address.isValid &&
                        userErrors.address.isTouched && (
                            <ErrorComponent>
                                {" "}
                                {userErrors.nationality.errorMsg}
                            </ErrorComponent>
                        )}

                        <div className="row justify-content-center mt-2">
                            <div className="col-md-8">
                                <input
                                    type="number"
                                    value={user.NationalIdOrPassportNo}
                                    onChange={(e) => {
                                        setUser({NationalIdOrPassportNo: e.target.value});
                                    }}
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    placeholder={"National ID Or Passport No"}
                                    aria-describedby="emailHelp"
                                />
                            </div>
                        </div>
                        {!userErrors.NationalIdOrPassportNo.isValid &&
                        userErrors.NationalIdOrPassportNo.isTouched && (
                            <ErrorComponent>
                                {" "}
                                {userErrors.NationalIdOrPassportNo.errorMsg}
                            </ErrorComponent>
                        )}

                        <div className="row justify-content-center mt-2">
                            <div className="col-md-8">
                                <input
                                    type="number"
                                    value={user.weight}
                                    onChange={(e) => {
                                        setUser({weight: e.target.value});
                                    }}

                                    
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    placeholder={"weight"}
                                    aria-describedby="emailHelp"
                                />
                            </div>
                        </div>
                        {!userErrors.weight.isValid &&
                        userErrors.weight.isTouched && (
                            <ErrorComponent>
                                {" "}
                                {userErrors.weight.errorMsg}
                            </ErrorComponent>
                        )}

                        <div className="row justify-content-center mt-2">
                            <div className="col-md-8">
                                <input
                                    type="number"
                                    value={user.height}
                                    onChange={(e) => {
                                        setUser({height: e.target.value});
                                    }}
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    placeholder={"height"}
                                    aria-describedby="emailHelp"
                                />
                            </div>
                        </div>
                        {!userErrors.height.isValid &&
                        userErrors.height.isTouched && (
                            <ErrorComponent>
                                {" "}
                                {userErrors.height.errorMsg}
                            </ErrorComponent>
                        )}

                        <div className="row justify-content-center mt-2">
                            <div className="col-md-8">
                                <input
                                    type="number"
                                    value={user.basalMetabolicRate}
                                    onChange={(e) => {
                                        setUser({basalMetabolicRate: e.target.value});
                                    }}
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    placeholder={"basal Metabolic Rate"}
                                    aria-describedby="emailHelp"
                                />
                            </div>
                        </div>
                        {!userErrors.basalMetabolicRate.isValid &&
                        userErrors.basalMetabolicRate.isTouched && (
                            <ErrorComponent>
                                {" "}
                                {userErrors.basalMetabolicRate.errorMsg}
                            </ErrorComponent>
                        )}


                        <div className="row justify-content-center mt-2">
                            <div className="col-md-8">
                                <select
                                    className="form-select"
                                    value={user.gender}
                                    onChange={(e) => {
                                        setUser({gender: e.target.value});
                                    }}
                                >
                                    <option value={""}> select gender</option>
                                    <option value={"Male"}> Male</option>
                                    <option value={"Female"}> Female</option>
                                </select>
                            </div>
                        </div>

                        {!userErrors.gender.isValid && userErrors.gender.isTouched && (
                            <ErrorComponent> {userErrors.gender.errorMsg}</ErrorComponent>
                        )}

                        <div className="row justify-content-center mt-2">
                            <div className="col-md-8">
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        // setAvatar(e.target.files[0])
                                        setUser({avatar: e.target.files[0]});
                                    }}
                                    className="form-control"
                                    placeholder={"password"}
                                    aria-describedby="emailHelp"
                                />
                            </div>
                        </div>

                        {!userErrors.avatar.isValid && userErrors.avatar.isTouched && (
                            <ErrorComponent> {userErrors.avatar.errorMsg}</ErrorComponent>
                        )}

                        {serverError !== "" && (
                            <ErrorComponent> {serverError}</ErrorComponent>
                        )}
                        <div className="row justify-content-center mt-3">
                            <div className="col-md-8 align-items-center">
                                <button
                                    type="submit"
                                    className="btn btn-primary align-self-center"
                                    onClick={() => {
                                        setRegisterPressed(registerPressed + 1);
                                    }}
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                        <div className="row justify-content-center mt-3">
                            <div className="col-md-8 align-items-center">
                                Already have an account? <Link to="/login">login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
