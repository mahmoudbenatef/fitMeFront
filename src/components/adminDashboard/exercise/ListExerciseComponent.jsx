import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import exerciseServices from "../../../API/exerciseServices";
import LoadingComponent from "../../reusableComponents/LoadingComponent";
export default function ListExerciseComponent() {
  let { path, url } = useRouteMatch();
  const [allExercises, setAllExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllExercises = async () => {
    const { status, data } = await exerciseServices.getAllExercises();
    setAllExercises([...data]);
    setLoading(false);
  };

  // get all the exercises
  useEffect(async () => {
    getAllExercises();
  }, []);
  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <React.Fragment>
          <Link
            className="btn btn-success m-3 p-1 float-end"
            to={`${path}/create`}
          >
            Create New Exercise
          </Link>
          <table className="table ">
            <caption className="mt-2 text-center">List of Exercises</caption>
            <thead key={-1}>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Duration</th>
                <th scope="col">Activity Type</th>
                <th scope="col">Averag Calories Male</th>
                <th scope="col">Averag Calories Female</th>
                <th scope="col">Not Allowed To</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allExercises.map((exercise) => {
                return (
                  <tr key={exercise._id}>
                    <td>{exercise.name}</td>
                    <td>{exercise.description}</td>
                    <td>{exercise.duration}</td>
                    <td>{exercise.activityType}</td>
                    <td>{exercise.avgCaloriesMale}</td>
                    <td>{exercise.avgCaloriesFemale}</td>
                    <td>{exercise.notAllowedTo.join(", ")}</td>
                    <td>
                      <Link
                        className="btn btn-warning btn-sm"
                        to={{
                          pathname: `${path}/edit`,
                          state: exercise,
                        }}
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </React.Fragment>
      )}
    </>
  );
}
