import React from "react";
import { Table, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function MealListComponet() {
  const [meals, setmeals] = useState([]);
  const [render, setrender] = useState(false);
  const history = useHistory();
 
  useEffect(() => {
    const fetchApi = async () => {
      const fetchedMeals = await axios.get("http://localhost:3001/meals");
      if (fetchedMeals) {
        setmeals(fetchedMeals.data);
      }
    };
  
    fetchApi();
  }, [render]);
  return (
    <div>
       <Button
       className="btn btn-success m-3 p-1 float-end"
        onClick={() => {
          history.push("/admin/meals");
        }}
      >
        Add new meal
      </Button>
      <Table striped bordered hover variant="dark" className="mt-5 ">
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>recipe</th>
            <th>meal type</th>
            <th>not allowed category</th>
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
              <td>{currentMeal.notAllowedTo[0]?.category.name}</td>
              <td>
                <button
                className="btn btn-danger"
                  onClick={async () => {
                    await axios.delete(
                      "http://localhost:3001/meals/" + currentMeal._id
                    );
                    setrender(!render);
                  }}
                >
                  delete
                </button>
              </td>
              <td>
                <Button
                  onClick={() => {
                    history.push("/admin/meals?id=" + currentMeal._id);
                  }}
                >
                  update
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
     
    </div>
  );
}

export default MealListComponet;
