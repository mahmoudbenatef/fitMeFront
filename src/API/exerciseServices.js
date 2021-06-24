import axios from "axios";
import { API, exerciseURL } from "./urls";

export default {
  createExercise(exercise) {
    try {
      return axios.post(exerciseURL.exercise, exercise, {
        headers: {
          Authorization: `JWT ${API.token()}`,
        },
      });
    } catch (error) {
      return error.response;
    }
  },
  getAllExercises() {
    return axios.get(exerciseURL.exercise);
  },
  updateExercise(exercise, exerciseId) {
    return axios.patch(`${exerciseURL.exercise}/${exerciseId}`, exercise, {
      headers: {
        Authorization: `JWT ${API.token()}`,
      },
    });
  },
  deleteExercise(exerciseId) {
    return axios.delete(
      `${exerciseURL.exercise}/${exerciseId}`,
      {},
      {
        headers: {
          Authorization: `JWT ${API.token()}`,
        },
      }
    );
  },
};
