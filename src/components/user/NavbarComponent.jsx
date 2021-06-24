import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import { mySessionStorage } from "../../helper/LocalStorge";
import  "../../styles/Nav.css"
import { BASE_URL } from "../../API/urls";
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
      <nav className="navbar navbar-expand-lg navbar-light justify-content-between " 
      // style={{backgroundColor:"#212529", color:"white"}}
      >
        <div >
          {
            isAdmin() ?(
              <ul className="navbar-nav mr-auto">
              <li >
  
                    <Link
                        className="nav-link"
                        to={isAdmin() ? "/admin/categories" : "/categories"}
                    >
                      Categories
                    </Link>  
                    </li>
                    <li >
  
                    <Link
                        className="nav-link"
                        to={ "/admin/camps"}
                    >
                      Camps
                    </Link>  
                    </li>
                    <li >
  
                    <Link
                        className="nav-link"
                        to={ "/admin/meals"}
                    >
                      meals
                    </Link>  
                    </li>
                    
                    
                    </ul>
                    
                    )
                :(
                    <>
                      <ul className="navbar-nav mr-auto">
            <li >
            <Link
                          className="nav-link"
                          to={"/user/questioner" }
                      >
                        Questioner
                      </Link>
                    
                    
              </li>
            <li >
            <Link
                          className="nav-link"
                          to={"/user/camps"}
                      >
                        Camps
                      </Link>
            </li>
            <li>
            <Link
                          className="nav-link"
                          to={"/user/plan"}
                      >
                        Plan
                      </Link>
            </li>
            </ul>
                     
                    </>
                )
          }
        </div>
        <div className={" "}>
        <ul className="navbar-nav mr-auto">
            <li >
           
        <img
                style={{ borderRadius: "2rem" }}
                src={BASE_URL + "/" + mySessionStorage.getCurrentUser().avatar}
                height="40"
                width="40"
                alt=""
              />
        </li>

            <li className=" nav-link">
              {mySessionStorage.getCurrentUser().firstname}{" "}
              {mySessionStorage.getCurrentUser().lastname}
            </li>

            <li>
         <li className="nav-link" onClick={logout}> Logout</li>
         </li>
         </ul>
        </div>
      </nav>

    </>
  );
}
