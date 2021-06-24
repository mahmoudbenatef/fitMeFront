import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ExerciseFormComponent from "./ExerciseFormComponent";
import ListExerciseComponent from "./ListExerciseComponent";

export default function ExerciseComponent() {
  let { path, url } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route key={1} path={`${path}/create`}>
          <ExerciseFormComponent />
        </Route>
        <Route key={1} path={`${path}/edit`}>
          <ExerciseFormComponent />
        </Route>
        <Route key={2} exact path={`${path}`}>
          <ListExerciseComponent />
        </Route>
      </Switch>
    </div>
  );
}
