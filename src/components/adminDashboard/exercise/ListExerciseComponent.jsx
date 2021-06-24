import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import exerciseServices from "../../../API/exerciseServices";
import statusCode from "../../../helper/statusCode";
import { default as LoadingComponent } from "../../reusableComponents/LoadingComponent";
import PaginationComponent from "../../reusableComponents/PaginationComponent";
export default function ListExerciseComponent() {
  let { path, url } = useRouteMatch();
  const [allExercises, setAllExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const getAllExercises = async () => {
    const { status, data } = await exerciseServices.getAllExercises({
      page: page,
      limit: 2,
    });
    setAllExercises(data);
    setLoading(false);
  };

  // get all the exercises
  useEffect(async () => {
    getAllExercises();
  }, [page]);

  const handleDeleteExercise = async (exercsieId) => {
    const { status, data } = await exerciseServices.deleteExercise(exercsieId);

    // remove from the array
    if (status === statusCode.Success) {
      const updatedExercsies = allExercises.data?.filter(
        (exercsie) => exercsie._id !== exercsieId
      );
      alert("Deleted Successfully");
      setAllExercises(updatedExercsies);
    } else {
      alert("Something went wronge please try again later");
    }
  };
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allExercises.data?.length > 0 &&
                allExercises.data.map((exercise) => {
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
                          <EditIcon fontSize="small" />
                        </Link>

                        <span className="btn btn-sm btn-danger m-1">
                          <DeleteIcon
                            fontSize="small"
                            onClick={() => handleDeleteExercise(exercise._id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}

              {allExercises.data?.length == 0 && (
                <tr>
                  <td colSpan={7}>No Exercsie Yet</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="d-flex justify-content-center">
            <PaginationComponent
              count={allExercises.count}
              page={page}
              setPage={setPage}
              variant="outlined"
              color="secondary"
            />
          </div>
        </React.Fragment>
      )}
    </>
  );
}
