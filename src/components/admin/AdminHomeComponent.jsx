import { useContext, useEffect } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import MealComponet from "../../components/meal/MealComponet";
import MealListComponet from "../../components/meal/MealListComponet";
import { authContext } from "../../contexts/authContext";
import { CampProvider } from "../../contexts/campContext";
import { CategoryProvider } from "../../contexts/categoryContext";
import CampComponent from "../adminDashboard/camp/CampComponent.jsx";
import DayPlanComponent from "../adminDashboard/campPlan/DayPlanComponent";
import ExceptionalPlanComponent from "../adminDashboard/campPlan/ExceptionalPlanComponent";
import ExceptionalUserPlan from "../adminDashboard/campPlan/ExceptionalUserPlan";
import PlanComponent from "../adminDashboard/campPlan/PlanComponent";
import RegularPlanComponent from "../adminDashboard/campPlan/RegularPlanComponent";
import CategoryComponent from "../adminDashboard/category/CategoryComponent";
import ExerciseComponent from "../adminDashboard/exercise/ExerciseComponent";
export default function AdminHomeComponent() {
  let { path, url } = useRouteMatch();
  const authentication = useContext(authContext);
  const history = useHistory();
  useEffect(() => {
    if (
      authentication.auth.authed === true &&
      authentication.auth.role === "user"
    ) {
      history.push("/user");
    }
    if (authentication.auth.authed === false) {
      history.push("/login");
    }
  }, []);

  return (
    <>
      <Switch>
        <Route key={2} path={`${path}/categories`}>
          <CategoryProvider>
            <CategoryComponent />
          </CategoryProvider>
        </Route>

        <Route key={2} path={`${path}/exercise`}>
          <ExerciseComponent />
        </Route>

        <Route key={3} path={`${path}/camps`}>
          <CampProvider>
            <CampComponent />
          </CampProvider>
        </Route>
        <Route path={`${path}/meals`}>
          <MealComponet />
        </Route>
        <Route exact path={`${path}/mealsList`}>
          <MealListComponet />
        </Route>
        <Route key={3} exact path={`${path}/camp/:id/plan`}>
          <PlanComponent />
        </Route>
        <Route exact key={4} path={`${path}/camp/:id/plan/:date`}>
          <DayPlanComponent />
        </Route>

        <Route exact key={5} path={`${path}/camp/:id/plan/:date/regular`}>
          <RegularPlanComponent />
        </Route>

        <Route exact key={6} path={`${path}/camp/:id/plan/:date/exceptional`}>
          <ExceptionalPlanComponent />
        </Route>

        <Route
          exact
          key={8}
          path={`${path}/camp/:id/plan/:date/exceptional/:userID`}
        >
          <ExceptionalUserPlan />
        </Route>
        {/*  */}
      </Switch>
    </>
  );
}
