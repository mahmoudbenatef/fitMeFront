import React from "react";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

function MealListComponet() {
  const [meals, setmeals] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const fetchedMeals = await axios.get("http://localhost:3001/meals");
      if (fetchedMeals) {
        setmeals(fetchedMeals.data);
      }
    };
    fetchApi();
  }, []);
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>recipe</th>
            <th>meal type</th>
            <th>not allowed category</th>
          </tr>
        </thead>
        <tbody>
          {meals.map((currentMeal,index) => (
            <tr>
              <td>{index+1}</td>
              <td>{currentMeal.name}</td>
              <td>{currentMeal.recipe}</td>
              <td>{currentMeal.mealType}</td>
              <td>{currentMeal.notAllowedTo[0]?.category.name}</td>

            </tr>
          ))}

       
        </tbody>
      </Table>
    </div>
  );
}

export default MealListComponet;
