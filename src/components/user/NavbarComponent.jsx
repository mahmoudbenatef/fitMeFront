import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import { mySessionStorage } from "../../helper/LocalStorge";

export default function NavbarComponent() {
  const authentication = useContext(authContext);
  const history = useHistory();
  const isAdmin = () => mySessionStorage.getCurrentUser().role === "admin";
  const logout = () => {
    mySessionStorage.removeCurrentUser();
    mySessionStorage.removeToken();
    authentication.setAuth({
      authed: false,
    });
    history.push("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light justify-content-between ">
        <div>
          {isAdmin() ? (
            <React.Fragment>
              <Link
                className="nav-link"
                to={isAdmin() ? "/admin/categories" : "/categories"}
              >
                Categories
              </Link>
              <Link
                className="nav-link"
                to={isAdmin() ? "/admin/exercsie" : ""}
              >
                Exercise
              </Link>
            </React.Fragment>
          ) : (
            <>
              <Link className="nav-link" to={"/user/questioner"}>
                Questioner
              </Link>
            </>
          )}
        </div>
        <div className={" "}>
          <button className="nav-link" onClick={logout}>
            {" "}
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}
