import { useContext } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { BASE_URL } from "./API/urls";
import "./App.css";
import AdminHomeComponent from "./components/admin/AdminHomeComponent.jsx";
import LoginComponent from "./components/auth/LoginComponent";
import RegisterComponent from "./components/auth/RegisterComponent";
import LandingPageComponent from "./components/landing-page/LandingPage.jsx";
import NavbarComponent from "./components/user/NavbarComponent";
import UserHomeComponent from "./components/user/UserHomeComponent";
import bg from "../src/assets/fitnes3.jpeg"
import { authContext } from "./contexts/authContext";
import MealComponet from "./components/meal/MealComponet";
import MealListComponet from "./components/meal/MealListComponet";
import DayPlan from "./components/plan/DayPlan";

function App(props) {
  const authentication = useContext(authContext);
  console.log(authentication);
  return (
    <>
      <Router>
        <div
          className="d-flex flex-column min-vh-100"
          style={{

            backgroundRepeat: "no-repeat",
            width: "100%"
          }}
        >
          {authentication.auth.authed === true && (
            <NavbarComponent></NavbarComponent>
          )}
          {authentication.auth.authed === false &&
            BASE_URL + "/register" === window.location.pathname && (
              <Redirect to={{ pathname: "/login" }} />
            )}
          <Switch>
            <Route exact path="/">
              <LandingPageComponent />
            </Route>
            <Route path="/user">
              <UserHomeComponent />
            </Route>
            <Route path="/login">
              <LoginComponent />
            </Route>
            <Route path="/register">
              <RegisterComponent />
            </Route>
            <Route path="/admin">
              <AdminHomeComponent />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
