import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "../../API/urls";

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
  const [videoId, setvideoId] = useState("");

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
      let mealToSave = await axios.patch(`${BASE_URL}/meals/${id}`, {
        name,
        recipe,
        mealType,
        videoId,
        // notAllowedTo: [{ category: notAllowedCat }],
      });
      console.log(mealToSave);
    } else {
      let mealToSave = await axios.post(`${BASE_URL}/meals`, {
        name,
        recipe,
        mealType,
        videoId,
        // notAllowedTo: [{ category: notAllowedCat }],
      });
    }
    history.push(`/admin/mealsList`);
  };
  useEffect(() => {
    const fetchApi = async () => {
      console.log("hello");
      const categories = await axios.get(`${BASE_URL}/category`);
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
        const currentMeal = await axios.get(`${BASE_URL}/meals/${id}`);
        console.log(currentMeal.data);
        setName(currentMeal.data.name);
        setRecipe(currentMeal.data.recipe);
        setMealType(currentMeal.data.mealType);
        setnotAllowedCat(currentMeal.data.notAllowedTo[0]?.category.name);
        setvideoId(currentMeal.data.videoId);
      };
      fetchApi();
    }
  }, []);
  return (
    <div className="container">
      <Form className="mt-5 ml-3">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter meal name"
            value={name}
            className="bg-transparent text-white border "
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="mt-3">Recipe</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter meal recipe"
            value={recipe}
            className="bg-transparent text-white "
            onChange={(e) => {
              setRecipe(e.target.value);
            }}
            rows={3}
          />
        </Form.Group>
        <Form.Group>
          <FormControl>
            <Form.Label className="mt-3">Meal Type</Form.Label>
            <Select
              value={mealType}
              variant="filled"
              onChange={handelMealChange}
              className="text-light"
              style={{
                margin: "0",
              }}
            >
              {Object.keys(mealTypes).map((key) => (
                <MenuItem value={key}> {mealTypes[key].name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="mt-3">Video Id</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Video Id"
            value={videoId}
            className="bg-transparent text-white mb-3 "
            onChange={(e) => {
              setvideoId(e.target.value);
            }}
          />
        </Form.Group>
      </Form>
      <Button variant="primary" type="submit" onClick={saveMeal}>
        Submit
      </Button>
    </div>
  );
}

export default MealComponet;
