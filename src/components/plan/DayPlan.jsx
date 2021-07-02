import axios from "axios";
import React from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { mySessionStorage } from "../../helper/LocalStorge";
import Divider from "@material-ui/core/Divider";
import ReactStars from "react-rating-stars-component";
const BASE_URL = "http://localhost:3001/";
const video_URL = "https://www.youtube.com/embed/";
function DayPlan() {
  const [dietPlan, setDietPlan] = useState();
  const [showBreakFast, setShowBreakFast] = useState(false);
  const [showLaunch, setShowLaunch] = useState(false);
  const [showDinner, setShowDinner] = useState(false);
  const [showRate, setShowRate] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [showExercise1, setShowExercise1] = useState(false);
  const [showExercise2, setShowExercise2] = useState(false);
  const [showExercise3, setShowExercise3] = useState(false);

  const handleCloseBreakFast = () => setShowBreakFast(false);
  const handleCloseLaunch = () => setShowLaunch(false);
  const handelCloseDinner = () => setShowDinner(false);
  const handelCloseRate = () => setShowRate(false);

  const handelCloseExercise1 = () => setShowExercise1(false);
  const handelCloseExercise2 = () => setShowExercise2(false);
  const handelCloseExercise3 = () => setShowExercise3(false);

  const handleShowBreakFast = () => setShowBreakFast(true);
  const handleShowLaunch = () => setShowLaunch(true);
  const handelShowDinner = () => setShowDinner(true);
  const handelShowRate = () => setShowRate(true);

  const handelShowExercise1 = () => setShowExercise1(true);
  const handelShowExercise2 = () => setShowExercise2(true);
  const handelShowExercise3 = () => setShowExercise3(true);

  const getCurrentDate = () => {
    let currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);
    return currentDate.toISOString();
  };
  const ratingChanged = async (newRating) => {
    console.log(newRating);
    await axios.patch(
      `${BASE_URL}plan/${
        mySessionStorage.getCurrentUser()._id
      }/${getCurrentDate()}/review`,
      { rate: newRating }
    );
    handelCloseRate();
  };

  useEffect(() => {
    console.log("test");
    console.log(Date.now);
    const fetchApi = async () => {
      try {
        const todayPlan = await axios.get(
          `${BASE_URL}plan/${
            mySessionStorage.getCurrentUser()._id
          }/${getCurrentDate()}`
        );

        if (todayPlan != null) {
          setLoaded(true);
          setDietPlan(todayPlan.data);

          const reviewsArr = todayPlan.data.camp.reviews;
          console.log(reviewsArr);
          let showRateFlag = true;
          reviewsArr.forEach((currentReviwer) => {
            if (mySessionStorage.getCurrentUser()._id == currentReviwer.user) {
              showRateFlag = false;
            }
          });

          let campDate = new Date(todayPlan.data.camp.date);
          campDate?.setDate(campDate.getDate() + 6);
          console.log(campDate);

          if (
            campDate &&
            getCurrentDate() == campDate.toISOString() &&
            showRateFlag
          ) {
            setShowRate(true);
          }
        } else {
          setLoaded(false);
        }
      } catch (error) {
        window.alert(error);
      }
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
            <iframe
              style={{ width: "16rem" }}
              src={`${video_URL}${dietPlan?.breakfast?.videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
            <Card.Title
              className="text-primary text-center"
              onClick={handleShowBreakFast}
            >
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
            <iframe
              style={{ width: "16rem" }}
              src={`${video_URL}${dietPlan?.lunch?.videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />

            <Card.Title
              className="text-primary text-center"
              onClick={handleShowLaunch}
            >
              lunch
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
            <iframe
              style={{ width: "16rem" }}
              src={`${video_URL}${dietPlan?.dinner?.videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />

            <Card.Title
              className="text-primary text-center"
              onClick={handelShowDinner}
            >
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
            <iframe
              style={{ width: "16rem" }}
              src={`${video_URL}${dietPlan?.exercise1?.videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
            <Card.Title
              className="text-primary text-center"
              onClick={handelShowExercise1}
            >
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
            <iframe
              style={{ width: "16rem" }}
              src={`${video_URL}${dietPlan?.exercise2?.videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />

            <Card.Title
              className="text-primary text-center"
              onClick={handelShowExercise2}
            >
              exercise 2
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
            <iframe
              style={{ width: "16rem" }}
              src={`${video_URL}${dietPlan?.exercise3?.videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />

            <Card.Title
              className="text-primary text-center"
              onClick={handelShowExercise3}
            >
              exersise 3
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
              <label
                className="btn btn-outline-primary"
                htmlFor="exersise3-btn"
              >
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

        <Modal show={showRate} onHide={handelCloseRate} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>add your rate to camp</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <div>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handelCloseRate}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default DayPlan;
