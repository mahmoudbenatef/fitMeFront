import axios from "axios";
import React from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { mySessionStorage } from "../../helper/LocalStorge";
import Divider from "@material-ui/core/Divider";
const BASE_URL = "http://localhost:3001/";
function DayPlan() {
  const [dietPlan, setDietPlan] = useState();
  const [showBreakFast, setShowBreakFast] = useState(false);
  const [showLaunch, setShowLaunch] = useState(false);
  const [showDinner, setShowDinner] = useState(false);

  const [showExercise1, setShowExercise1] = useState(false);
  const [showExercise2, setShowExercise2] = useState(false);
  const [showExercise3, setShowExercise3] = useState(false);

  const handleCloseBreakFast = () => setShowBreakFast(false);
  const handleCloseLaunch = () => setShowLaunch(false);
  const handelCloseDinner = () => setShowDinner(false);

  const handelCloseExercise1 = () => setShowExercise1(false);
  const handelCloseExercise2 = () => setShowExercise2(false);
  const handelCloseExercise3 = () => setShowExercise3(false);

  const handleShowBreakFast = () => setShowBreakFast(true);
  const handleShowLaunch = () => setShowLaunch(true);
  const handelShowDinner = () => setShowDinner(true);

  const handelShowExercise1 = () => setShowExercise1(true);
  const handelShowExercise2 = () => setShowExercise2(true);
  const handelShowExercise3 = () => setShowExercise3(true);


  const getCurrentDate = () => {
    let currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);
    return currentDate.toISOString();
  };

  useEffect(() => {
    console.log("test");
    console.log(Date.now);
    const fetchApi = async () => {
      const todayPlan = await axios.get(
        `${BASE_URL}plan/${
          mySessionStorage.getCurrentUser()._id
        }/${getCurrentDate()}`
      );
      console.log(todayPlan);
      setDietPlan(todayPlan.data);
    };
    fetchApi();
  }, []);
  return (
    <>
      <h1 className="text-center  " style={{ color: "white" }}>
        meals
      </h1>
      <div
        className="container "
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {/* <h1>{JSON.stringify(dietPlan)}</h1> */}

        <Card style={{ width: "18rem" }}>
          <Card.Body className="form-group mt-5 ">
            <Card.Img
              variant="top"
              className="img-thumbnail"
              src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/healthy_porridge_bowl-d434804.jpg"
              onClick={handleShowBreakFast}
            />
            <Card.Title className="text-primary text-center">
              breakfast
            </Card.Title>
            <br />
            <div
              className="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                className="btn-check"
                name="breakfast"
                onChange={() => {}}
                onClick={async () => {
                  const todayPlan = await axios.patch(
                    `${BASE_URL}plan/${
                      mySessionStorage.getCurrentUser()._id
                    }/${getCurrentDate()}`,
                    {
                      breakfastCheck: true,
                    }
                  );

                  setDietPlan({ ...dietPlan, breakfastCheck: true });
                }}
                id="breakfast"
                autoComplete="off"
                checked={dietPlan?.breakfastCheck || false}
                disabled={dietPlan?.breakfastCheck}
              />
              <label className="btn btn-outline-primary" htmlFor="breakfast">
                Yes
              </label>
            </div>

            <Modal
              show={showBreakFast}
              onHide={handleCloseBreakFast}
              animation={true}
            >
              <Modal.Header closeButton>
                <Modal.Title>{dietPlan?.breakfast?.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{dietPlan?.breakfast?.recipe}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseBreakFast}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }}>
          <Card.Body className="form-group mt-5 align-items-center">
            <Card.Img
              variant="top"
              className="img-thumbnail"
              src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/healthy_porridge_bowl-d434804.jpg"
              onClick={handleShowLaunch}
            />
            <Card.Title className="text-primary text-center">lunch</Card.Title>
            <br />
            <div
              className="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                className="btn-check"
                name="lunch"
                onChange={() => {}}
                onClick={async () => {
                  const todayPlan = await axios.patch(
                    `${BASE_URL}plan/${
                      mySessionStorage.getCurrentUser()._id
                    }/${getCurrentDate()}`,
                    {
                      lunchCheck: true,
                    }
                  );
                  setDietPlan({ ...dietPlan, lunchCheck: true });
                }}
                id="launch"
                autoComplete="off"
                checked={dietPlan?.lunchCheck || false}
                disabled={dietPlan?.lunchCheck}
              />
              <label className="btn btn-outline-primary" htmlFor="launch">
                Yes
              </label>
            </div>

            <Modal
              show={showLaunch}
              onHide={handleCloseLaunch}
              animation={true}
            >
              <Modal.Header closeButton>
                <Modal.Title>{dietPlan?.lunch?.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{dietPlan?.lunch?.recipe}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseLaunch}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }}>
          <Card.Body className="form-group mt-5 align-items-center">
            <Card.Img
              variant="top"
              className="img-thumbnail"
              src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/healthy_porridge_bowl-d434804.jpg"
              onClick={handelShowDinner}
            />
            <Card.Title className="text-primary text-center">dinner</Card.Title>
            <br />
            <div
              className="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                className="btn-check"
                name="dinner"
                onChange={() => {}}
                onClick={async () => {
                  const todayPlan = await axios.patch(
                    `${BASE_URL}plan/${
                      mySessionStorage.getCurrentUser()._id
                    }/${getCurrentDate()}`,
                    {
                      dinnerCheck: true,
                    }
                  );
                  setDietPlan({ ...dietPlan, dinnerCheck: true });
                }}
                id="dinner"
                autoComplete="off"
                checked={dietPlan?.dinnerCheck || false}
                disabled={dietPlan?.dinnerCheck}
              />
              <label className="btn btn-outline-primary" htmlFor="dinner">
                Yes
              </label>
            </div>

            <Modal
              show={showDinner}
              onHide={handelCloseDinner}
              animation={true}
            >
              <Modal.Header closeButton>
                <Modal.Title>{dietPlan?.dinner?.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{dietPlan?.dinner?.recipe}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handelCloseDinner}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Card.Body>
        </Card>
      </div>
      <h1 className="text-center text-light mt-3">exercises</h1>
      <div
        className="container "
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {/* <h1>{JSON.stringify(dietPlan)}</h1> */}

        <Card style={{ width: "18rem" }}>
          <Card.Body className="form-group mt-5 ">
            <Card.Img
              variant="top"
              className="img-thumbnail"
              src="https://api.time.com/wp-content/uploads/2019/09/getting-back-to-exercise-routine.jpg"
              onClick={handelShowExercise1}
            />
            <Card.Title className="text-primary text-center">
              Exercise 1
            </Card.Title>
            <br />
            <div
              className="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                className="btn-check"
                name=" Exercise 1"
                onChange={() => {}}
                onClick={async () => {
                  const todayPlan = await axios.patch(
                    `${BASE_URL}plan/${
                      mySessionStorage.getCurrentUser()._id
                    }/${getCurrentDate()}`,
                    {
                      exercise1Check: true,
                    }
                  );

                  setDietPlan({ ...dietPlan, exercise1Check: true });
                }}
                id="exersise1"
                autoComplete="off"
                checked={dietPlan?.exercise1Check || false}
                disabled={dietPlan?.exercise1Check}
              />
              <label className="btn btn-outline-primary" htmlFor="exersise1">
                Yes
              </label>
            </div>

            <Modal
              show={showExercise1}
              onHide={handelCloseExercise1}
              animation={true}
            >
              <Modal.Header closeButton>
                <Modal.Title>{dietPlan?.exercise1?.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{dietPlan?.exercise1?.description}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handelCloseExercise1}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }}>
          <Card.Body className="form-group mt-5 align-items-center">
            <Card.Img
              variant="top"
              className="img-thumbnail"
              src="https://api.time.com/wp-content/uploads/2019/09/getting-back-to-exercise-routine.jpg"
              onClick={handelShowExercise2}
            />
            <Card.Title className="text-primary text-center">exercise 2</Card.Title>
            <br />
            <div
              className="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                className="btn-check"
                name="exercise2"
                onChange={() => {}}
                onClick={async () => {
                  const todayPlan = await axios.patch(
                    `${BASE_URL}plan/${
                      mySessionStorage.getCurrentUser()._id
                    }/${getCurrentDate()}`,
                    {
                      exercise2Check: true,
                    }
                  );
                  setDietPlan({ ...dietPlan, exercise2Check: true });
                }}
                id="exersise2"
                autoComplete="off"
                checked={dietPlan?.exercise2Check || false}
                disabled={dietPlan?.exercise2Check}
              />
              <label className="btn btn-outline-primary" htmlFor="exersise2">
                Yes
              </label>
            </div>

            <Modal
              show={showExercise2}
              onHide={handelCloseExercise2}
              animation={true}
            >
              <Modal.Header closeButton>
                <Modal.Title>{dietPlan?.exercise2?.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{dietPlan?.exercise2?.description}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handelCloseExercise2}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }}>
          <Card.Body className="form-group mt-5 align-items-center">
            <Card.Img
              variant="top"
              className="img-thumbnail"
              src="https://api.time.com/wp-content/uploads/2019/09/getting-back-to-exercise-routine.jpg"
              onClick={handelShowExercise3}
            />
            <Card.Title className="text-primary text-center">exersise 3</Card.Title>
            <br />
            <div
              className="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                className="btn-check"
                name="exersise3-btn"
                onChange={() => {}}
                onClick={async () => {
                  const todayPlan = await axios.patch(
                    `${BASE_URL}plan/${
                      mySessionStorage.getCurrentUser()._id
                    }/${getCurrentDate()}`,
                    {
                      exercise3Check: true,
                    }
                  );
                  setDietPlan({ ...dietPlan, exercise3Check: true });
                }}
                id="exersise3-btn"
                autoComplete="off"
                checked={dietPlan?.exercise3Check || false}
                disabled={dietPlan?.exercise3Check}
              />
              <label className="btn btn-outline-primary" htmlFor="exersise3-btn">
                Yes
              </label>
            </div>

            <Modal
              show={showExercise3}
              onHide={handelCloseExercise3}
              animation={true}
            >
              <Modal.Header closeButton>
                <Modal.Title>{dietPlan?.exercise3?.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{dietPlan?.exercise3?.description}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handelCloseExercise3}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default DayPlan;
