import { useContext, useEffect, useState } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import QuestionerComponent from "../userDashboard/QuestionerComponent"
import AvailCampsComponent from "../userDashboard/AvailCampsComponent"
import DayPlan from "../plan/DayPlan";
export default function UserHomeComponent() {
  let { path} = useRouteMatch();
  const authentication = useContext(authContext);
  const history = useHistory();
  useEffect(() => {
    if (
        authentication.auth.authed === true &&
        authentication.auth.role === "admin"
    ) {
      history.push("/admin");
    }
    if (authentication.auth.authed === false) {
      history.push("/login");
    }
  }, []);
  return (
      <>
        <Switch>

          <Route key={1} path={`${path}/questioner`}>
            <QuestionerComponent/>
          </Route>

           <Route key={2} path={`${path}/camps`}>
            <AvailCampsComponent/>
          </Route>


            {/*<Route path="/authors/:id">*/}
            {/*  <AuthorDetails />*/}
            {/*</Route>*/}
            <Route exact path={`${path}/plan`}>
             <DayPlan/>
            </Route>

        </Switch>

      </>
  );
}
