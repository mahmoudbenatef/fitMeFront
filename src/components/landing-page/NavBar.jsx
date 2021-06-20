import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/fitnes.jpeg";

export default function NavBar() {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src={logo}
              alt=""
              width="50"
              height="50%"
              className="d-inline-block align-text-top"
            />
            <span className="m-3">Fit Me</span>
          </a>
          <div className="">
            <Link className="btn m-2 text-white " to="/login">
              Login
            </Link>
            <Link className="btn m-2 text-white " to="/register">
              Register
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
