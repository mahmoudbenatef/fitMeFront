import { InputLabel } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
const BASE_URL = "http://localhost:3001/";
const mealTypes = {
  breakfast: {
    id: "breakfast",
    name: "breakfast",
  },
  brunch: {
    id: "brunch",
    name: "brunch",
  },
  dinner: {
    id: "dinner",
    name: "dinner",
  },
  lunch: {
    id: "lunch",
    name: "lunch",
  },
};
function MealComponet() {
  const [mealType, setMealType] = React.useState(mealTypes.breakfast.id);
  const [recipe, setRecipe] = useState("");
  const [name, setName] = useState("");
  const [notAllowedTo, setNotAllowedTo] = useState([]);
  const [notAllowedCat, setnotAllowedCat] = useState("");
  let history = useHistory();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("id");
  const handelMealChange = (event) => {
    setMealType(event.target.value);
  };
  const handelNotAllowedCatChange = (event) => {
    console.log(event.target.value);
    setnotAllowedCat(event.target.value);
  };
  const saveMeal = async (e) => {
    e.preventDefault();
    if (id) {
      let mealToSave = await axios.patch(`${BASE_URL}meals/${id}`, {
        name,
        recipe,
        mealType,
        // notAllowedTo: [{ category: notAllowedCat }],
      });
      console.log(mealToSave);
    }else{
    let mealToSave = await axios.post(`${BASE_URL}meals`, {
      name,
      recipe,
      mealType,
      // notAllowedTo: [{ category: notAllowedCat }],
    });
  }
    history.push(`/admin/mealsList`);
  };
  useEffect(() => {
    const fetchApi = async () => {
      console.log("hello");
      const categories = await axios.get(`${BASE_URL}category`);
      if (categories) {
        console.log();
        setNotAllowedTo([...categories.data.data]);
      }
    };
    fetchApi();
  }, []);
  useEffect(() => {
    if (id) {
      const fetchApi = async () => {
        console.log("hello");
        const currentMeal = await axios.get(`${BASE_URL}meals/${id}`);
        console.log(currentMeal.data);
        setName(currentMeal.data.name);
        setRecipe(currentMeal.data.recipe);
        setMealType(currentMeal.data.mealType);
        setnotAllowedCat(currentMeal.data.notAllowedTo[0]?.category.name);
      };
      fetchApi();
    }
  }, []);
  return (
    <div>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter meal name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Recipe</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter meal recipe"
            value={recipe}
            onChange={(e) => {
              setRecipe(e.target.value);
            }}
            rows={3}
          />
        </Form.Group>
        <InputLabel htmlFor="demo-simple-select-label">Meal Type</InputLabel>
        <select value={mealType} onChange={handelMealChange}>
          {Object.keys(mealTypes).map((key) => (
            <option key={key} value={key}>
              {mealTypes[key].name}
            </option>
          ))}
        </select>

        <select value={notAllowedCat} onChange={handelNotAllowedCatChange}>
          {notAllowedTo.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.label}
            </option>
          ))}
        </select>

        <Button variant="primary" type="submit" onClick={saveMeal}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default MealComponet;
