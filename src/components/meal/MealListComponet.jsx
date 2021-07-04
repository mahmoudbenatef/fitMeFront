import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "../../API/urls";

function MealListComponet() {
  const [meals, setmeals] = useState([]);
  const [render, setrender] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchApi = async () => {
      const fetchedMeals = await axios.get(`${BASE_URL}/meals`);
      if (fetchedMeals) {
        setmeals(fetchedMeals.data);
      }
    };

    fetchApi();
  }, [render]);
  return (
    <div className="container">
      <Button
        className="btn btn-success m-3 p-1 float-end"
        onClick={() => {
          history.push("/admin/meals");
        }}
      >
        Add new meal
      </Button>
      <Table striped bordered hover variant="dark" className="mt-5 ">
        <caption style={{ color: "white" }}>List of Meals</caption>

        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>recipe</th>
            <th>meal type</th>
            <th>delete</th>
            <th>update</th>
          </tr>
        </thead>
        <tbody>
          {meals.map((currentMeal, index) => (
            <tr key={currentMeal._id}>
              <td>{index + 1}</td>
              <td>{currentMeal.name}</td>
              <td>{currentMeal.recipe}</td>
              <td>{currentMeal.mealType}</td>
              <td className="text-center">
                <DeleteIcon
                  fontSize="large"
                  style={{
                    cursor: "pointer",
                  }}
                  className="btn-danger"
                  onClick={async () => {
                    await axios.delete(BASE_URL + "/meals/" + currentMeal._id);
                    setrender(!render);
                  }}
                />
              </td>
              <td className="text-center">
                <EditIcon
                  style={{
                    cursor: "pointer",
                  }}
                  fontSize="large"
                  className="btn-warning text-white"
                  onClick={() => {
                    history.push("/admin/meals?id=" + currentMeal._id);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default MealListComponet;
