import { useContext, useEffect } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import { CategoryProvider } from "../../contexts/categoryContext";
import { CampProvider } from "../../contexts/campContext";
import CategoryComponent from "../adminDashboard/category/CategoryComponent";
import CampComponent from "../adminDashboard/camp/CampComponent.jsx"
import MealComponet from "../../components/meal/MealComponet";
import MealListComponet from "../../components/meal/MealListComponet";

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
        {/*<Route key={1} path={`${path}/books`}>*/}
        {/*  <BooksComponent />*/}
        {/*</Route>*/}

        <Route key={2} path={`${path}/categories`}>
          <CategoryProvider>
            <CategoryComponent />
          </CategoryProvider>
        </Route>


        <Route key={3} path={`${path}/camps`}>
          <CampProvider>
            <CampComponent />
          </CampProvider>
        </Route>

        <Route path={`${path}/meals`}>
              <MealComponet/>
            </Route>
            <Route path={`${path}/mealsList`}>
              <MealListComponet/>
            </Route>
        {/*<Route key={3} path={`${path}/authors`}>*/}
        {/*</Route>*/}
      </Switch>
    </>
  );
}

