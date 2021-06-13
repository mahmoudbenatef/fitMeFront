import { useContext, useEffect, useState } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { authContext } from "../../contexts/authContext";

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
        <h1>Hello user</h1>
        {/* <RateComponent bookId="609964ba4d02fa267a53acf4" userRating={2} size="small"></RateComponent>
       <ShelfComponent bookId="609964ba4d02fa267a53acf4" ></ShelfComponent> */}
        <Switch>

          {/*<Route key={1} path={`${path}/books`}>*/}
          {/*  <BooksCardContainerComponent></BooksCardContainerComponent>*/}
          {/*</Route>*/}

          {/* <Route key={2} path={`${path}/authors`}>
            <AuthorsList />
          </Route>

            <Route key={3} path={`${path}/authors/:id"`}>
                <AuthorDetails />
            </Route> */}

            {/*<Route path="/authors/:id">*/}
            {/*  <AuthorDetails />*/}
            {/*</Route>*/}

        </Switch>

      </>
  );
}
