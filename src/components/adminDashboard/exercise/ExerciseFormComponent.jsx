import React, { useEffect, useReducer, useState } from "react";
import { useHistory, useLocation } from "react-router";
import exerciseServices from "../../../API/exerciseServices";
import statusCode from "../../../helper/statusCode";
import "../../../styles/exercise.css";
import ErrorComponent from "../../reusableComponents/ErrorComponent";

const errorsMessages = {
  name: "Exercise name is requred",
  description: "Please write the exercise description",
  duration: "Duration is must",
  avgCaloriesMale: "Please provide The average calories for males ",
  avgCaloriesFemale: "Please provide The average calories for Females",
  notAllowedTo: "",
  activityType: "Please mention the acitviy type",
};

export default function ExerciseFormComponent({ updated }) {
  const [exercise, setExercise] = useReducer(
    (oldState, updateState) => ({ ...oldState, ...updateState }),
    {
      name: "",
      description: "",
      duration: "",
      avgCaloriesMale: "",
      avgCaloriesFemale: "",
      activityType: "",
      notAllowedTo: "",
    }
  );

  // navigator
  const history = useHistory();

  // accessing the passed object
  const location = useLocation();
  const updateExercise = location?.state;

  // if there is an updated objcet pass, set it to the form
  useEffect(() => {
    if (updateExercise) {
      setExercise(updateExercise);
    }
  }, []);

  const [error, setError] = useState({});
  const isValidForm = () => {
    // empty object to carry the errors
    const errors = {};

    if (exercise.name.length === 0) {
      errors.name = errorsMessages.name;
    }

    if (exercise.description.length === 0) {
      errors.description = errorsMessages.description;
    }

    if (exercise.duration.length === 0) {
      errors.duration = errorsMessages.duration;
    }

    if (exercise.avgCaloriesMale.length === 0) {
      errors.avgCaloriesMale = errorsMessages.avgCaloriesMale;
    }

    if (exercise.avgCaloriesFemale.length === 0) {
      errors.avgCaloriesFemale = errorsMessages.avgCaloriesFemale;
    }

    if (exercise.activityType.length === 0) {
      errors.activityType = errorsMessages.activityType;
    }

    // render the component to print the errors message if exist
    setError(errors);

    // if there is any error message that mean the form is not valid
    if (Object.keys(errors).length > 0) {
      return false;
    }
    // there is no any error message in the objcet, so the form is vaild
    return true;
  };
  const handelSubmitExercise = async (e) => {
    // prevent refresh the page
    e.preventDefault();
    // if not valid form do not submit it and rais errors
    if (!isValidForm()) return;
    //  remove all white space and  convert notAllowedTo into array
    if (
      exercise.notAllowedTo.length > 0 &&
      typeof exercise.notAllowedTo === "string"
    ) {
      exercise.notAllowedTo = exercise.notAllowedTo
        .replace(/\s/g, "")
        .split(",");
    }

    // handle updated and create
    if (updateExercise) {
      const { status, data } = await exerciseServices.updateExercise(
        exercise,
        exercise._id
      );

      if (status === statusCode.Success) {
        alert("Exercise Created Succeffuly ..");
      } else {
        alert("Something went wrong please try again later ..");
        console.log("something went wrong", data);
      }

      // create new one
    } else {
      const { status, data } = await exerciseServices.createExercise(exercise);

      if (status === statusCode.Success) {
        alert("Exercise Updated Succeffuly ..");
      } else {
        alert("Something went wrong please try again later ..");
        console.log("something went wrong", data);
      }
    }
    // navigate to exercise page after create or update exercise
    history.push("/admin/exercsie");
  };
  return (
    <div id="exerciseContainer">
      <div className="container mt-2">
        <form onSubmit={handelSubmitExercise}>
          <div class="mb-3">
            <label for="name" class="form-label">
              Exercise Name:
            </label>
            <input
              type="text"
              class="form-control"
              id="name"
              value={exercise.name}
              minLength={3}
              onChange={(e) => setExercise({ name: e.target.value })}
            />
            {error.name ? <ErrorComponent>{error.name}</ErrorComponent> : ""}
          </div>

          <div class="mb-3">
            <label for="description" class="form-label">
              Exercise Description
            </label>
            <textarea
              class="form-control"
              id="description"
              value={exercise.description}
              rows="3"
              minLength={10}
              onChange={(e) => setExercise({ description: e.target.value })}
            ></textarea>
            {error.description ? (
              <ErrorComponent>{error.description}</ErrorComponent>
            ) : (
              ""
            )}
          </div>

          <div class="mb-3">
            <label for="duration" class="form-label">
              Duration:
            </label>
            <input
              type="text"
              class="form-control"
              id="duration"
              value={exercise.duration}
              minLength={2}
              onChange={(e) => setExercise({ duration: e.target.value })}
            />
            {error.duration ? (
              <ErrorComponent>{error.duration}</ErrorComponent>
            ) : (
              ""
            )}
          </div>

          <div class="mb-3">
            <label for="duration" class="form-label">
              activityType:
            </label>
            <input
              type="text"
              class="form-control"
              id="duration"
              value={exercise.activityType}
              minLength={2}
              onChange={(e) => setExercise({ activityType: e.target.value })}
            />
            {error.activityType ? (
              <ErrorComponent>{error.activityType}</ErrorComponent>
            ) : (
              ""
            )}
          </div>

          <div class="mb-3">
            <label for="avgMale" class="form-label">
              Average Calories For Male:
            </label>
            <input
              type="text"
              class="form-control"
              id="avgMale"
              minLength={3}
              value={exercise.avgCaloriesMale}
              onChange={(e) => setExercise({ avgCaloriesMale: e.target.value })}
            />
            {error.avgCaloriesMale ? (
              <ErrorComponent>{error.avgCaloriesMale}</ErrorComponent>
            ) : (
              ""
            )}
          </div>

          <div class="mb-3">
            <label for="avgFemaale" class="form-label">
              Average Calories For Female:
            </label>
            <input
              type="text"
              class="form-control"
              id="avgFemaale"
              value={exercise.avgCaloriesFemale}
              minLength={3}
              onChange={(e) =>
                setExercise({ avgCaloriesFemale: e.target.value })
              }
            />
            {error.avgCaloriesFemale ? (
              <ErrorComponent>{error.avgCaloriesFemale}</ErrorComponent>
            ) : (
              ""
            )}
          </div>

          <div class="mb-3">
            <label for="notAllowedTo" class="form-label">
              Not Allowed To:{" "}
              <span style={{ fontSize: "x-large" }}>"sperated by ,"</span>
            </label>
            <input
              type="text"
              class="form-control"
              id="notAllowedTo"
              value={exercise.notAllowedTo}
              onChange={(e) => setExercise({ notAllowedTo: e.target.value })}
            />
          </div>
          <div class="mb-3">
            <button className="btn btn-success btn-sm">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
