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

  const handleCloseBreakFast = () => setShowBreakFast(false);
  const handleCloseLaunch = () => setShowLaunch(false);
  const handelCloseDinner = () => setShowDinner(false);

  const handleShowBreakFast = () => setShowBreakFast(true);
  const handleShowLaunch = () => setShowLaunch(true);
  const handelShowDinner = () => setShowDinner(true);
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
      <h1 className="text-center text-body">meals</h1>
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
                onClick={async() => {
                  const todayPlan = await axios.patch(
                    `${BASE_URL}plan/${
                      mySessionStorage.getCurrentUser()._id
                    }/${getCurrentDate()}`,{
                      breakfastCheck:true
                    }
                  );
           
                  setDietPlan({...dietPlan,breakfastCheck:true});

                }}

                id="breakfast"
                autoComplete="off"
                checked={dietPlan?.breakfastCheck||false}
                disabled={dietPlan?.breakfastCheck}
              />
              <label className="btn btn-outline-primary" htmlFor="breakfast">
                Yes
              </label>
            </div>

            <Modal show={showBreakFast} onHide={handleCloseBreakFast} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>{dietPlan?.breakfast.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{dietPlan?.breakfast.recipe}</Modal.Body>
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
                onChange={() => {
                  
                }}
                onClick={async() => {
                  
                  const todayPlan = await axios.patch(
                    `${BASE_URL}plan/${
                      mySessionStorage.getCurrentUser()._id
                    }/${getCurrentDate()}`,{
                      lunchCheck:true
                    }
                  );
                  setDietPlan({...dietPlan,lunchCheck:true});

                }}
                id="launch"
                autoComplete="off"
                checked={dietPlan?.lunchCheck||false}
                disabled={dietPlan?.lunchCheck}
              />
              <label className="btn btn-outline-primary" htmlFor="launch">
                Yes
              </label>
            </div>

            <Modal show={showLaunch} onHide={handleCloseLaunch} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>{dietPlan?.lunch.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{dietPlan?.lunch.recipe}</Modal.Body>
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
            <Card.Title className="text-primary text-center">
              dinner
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
                name="dinner"
                onChange={() => {
                  
                }}
                onClick={async() => {
                  const todayPlan = await axios.patch(
                    `${BASE_URL}plan/${
                      mySessionStorage.getCurrentUser()._id
                    }/${getCurrentDate()}`,{
                      dinnerCheck:true
                    }
                  );
                  setDietPlan({...dietPlan,dinnerCheck:true});

                }}
                id="dinner"
                autoComplete="off"
                checked={dietPlan?.dinnerCheck||false}
                disabled={dietPlan?.dinnerCheck}
              />
              <label className="btn btn-outline-primary" htmlFor="dinner">
                Yes
              </label>
            </div>

            <Modal show={showDinner} onHide={handelCloseDinner} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>{dietPlan?.dinner.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{dietPlan?.dinner.recipe}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handelCloseDinner}>
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
