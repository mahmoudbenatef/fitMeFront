import { useContext, useEffect, useState, useReducer } from "react";
import { ApiServices } from "../../API/ApiServices";
import { mySessionStorage } from "../../helper/LocalStorge";
import { useHistory } from "react-router-dom";
import { Card, Collapse, Button } from "react-bootstrap";

export default function QuesionerComponent() {
  const history = useHistory();
  const [isUpdate, setIsUpdate] = useState({ state: false, _id: undefined });
  const [section1, setSection1] = useState(true);
  const [section2, setSection2] = useState(false);
  const [section3, setSection3] = useState(false);

  const [questioner, setQuestioner] = useReducer(
    (oldstate, updates) => ({ ...oldstate, ...updates }),
    {
      user: mySessionStorage.getCurrentUser()._id,
      areYouSomker: false,
      doYouDrinkAlcohol: false,
      howOftenDoYouEatJunkFoodPerWeek: 0,
      howManyGlassesOfWaterDoYouDrinkPerDay: 0,
      HowManyCupsOfCoffeeDoYouDrinkPerDay: 0,
      howManyGlassesOfSodaDrinksDoYouDrinkPerDay: 0,
      howManyMealsDoYouEatPerDay: 0,
      howManyVegetablePortionsDoYouEatPerDay: 0,
      howManyFruitPortionsDoYouEatPerDay: 0,
      howManyProteinPortionsDoYouEatPerDay: 0,
      howManyCarbohydratePortionsDoYouEatPerDay: 0,
      howManySweetPortionsDoYouEatPerDay: 0,
      willYouEatSpicyFood: false,
      willYouEatFoodContainingGluten: false,
      doYouHaveAnyFoodAllergiesOrIntolerances: "",
      pleaseStateTheTypesOfFoodAndBeveragesYouEatInYourGeneralRoutine: "",
      areThereAnyFoodsYouCannotOrWillNotEat: "",
      foodAndBeveragesThatYouWouldLikeToAdd: "",
      doYouCurrentlyExercise: "",
      didYouUseToExerciseInThePast: "",
      informationRelatedToFitnessAndExerciseThatYouWouldLikeToAdd: "",
      heartCondition: false,
      feelPainInYourChest: false,
      feelFaintOrDizzy: false,
      jointProblem: false,
      highLowBloodPressure: false,
      reasonWhyYouShouldNotParticipateInPhysicalActivity: "",
      takingAnyMedicationOfWhichWeShouldBeMadeAwareOf: "",
      majorOrMinorSurgeryShouldBeMadeAwareOf: "",
    }
  );

  function saveQuestioner() {
    isUpdate.state
      ? ApiServices.updateQuestioner(isUpdate._id, questioner).then(() => {
          setTimeout(() => {
            history.push("/user/camps"); 
          }, 1000);
      
        })
      : ApiServices.saveQuestioner(questioner)
          .then((data) => {
            mySessionStorage.setCurrentUser(data.data);
            
            setTimeout(() => {
                history.push("/user/camps");
                
            }, 1000);
          })
          .catch(() => {});
  }

  useEffect(() => {
    ApiServices.getQuestioner(mySessionStorage.getCurrentUser()._id)
      .then((data) => {
        const { data: newData } = data;
        if (newData) {
          setQuestioner(newData);
          setIsUpdate({ state: true, _id: newData._id });
        }
      })
      .catch(() => {});
  }, []);
  return (
    <>
      <div className="container" style={{ color: "white" }}>
        <h1>Please help us to fill this questioner</h1>
        <div>
          <h1 className="text-info mt-3">
            section 1{" "}
            <span>
              <Button
                onClick={() => {
                  setSection1(!section1);
                }}
              >
                {section1 == false ? "+" : "-"}
              </Button>
            </span>
          </h1>
        </div>
        <Collapse in={section1}>
          <Card style={{ backgroundColor: "transparent" }}>
            <div className="form-group mt-5">
              <label>Are you a smoker ?</label>
              <br />

              <div
                className="btn-group"
                role="group"
                aria-label="Basic radio toggle button group"
              >
                <input
                  type="radio"
                  className="btn-check"
                  name="smoker"
                  onChange={() => {}}
                  onClick={() => {
                    setQuestioner({ areYouSomker: true });
                  }}
                  id="yesSmoker"
                  autoComplete="off"
                  checked={questioner.areYouSomker}
                />
                <label className="btn btn-outline-primary" htmlFor="yesSmoker">
                  Yes
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  onChange={() => {}}
                  name="smoker"
                  onClick={() => {
                    setQuestioner({ areYouSomker: false });
                  }}
                  id="noSmoker"
                  autoComplete="off"
                  checked={!questioner.areYouSomker}
                />
                <label className="btn btn-outline-primary" htmlFor="noSmoker">
                  No
                </label>
              </div>
            </div>

            <div className="form-group mt-5">
              <label>Do you drink alcohol ?</label>
              <br />
              <div
                className="btn-group"
                role="group"
                aria-label="Basic radio toggle button group"
              >
                <input
                  type="radio"
                  onChange={() => {}}
                  onClick={() => {
                    setQuestioner({ doYouDrinkAlcohol: true });
                  }}
                  className="btn-check"
                  name="alcohol"
                  id="yesalcohol"
                  autoComplete="off"
                  checked={questioner.doYouDrinkAlcohol}
                />
                <label className="btn btn-outline-primary" htmlFor="yesalcohol">
                  Yes
                </label>
                <input
                  type="radio"
                  onChange={() => {}}
                  onClick={() => {
                    setQuestioner({ doYouDrinkAlcohol: true });
                  }}
                  checked={!questioner.doYouDrinkAlcohol}
                  className="btn-check"
                  name="alcohol"
                  id="noalcohol"
                  autoComplete="off"
                />
                <label className="btn btn-outline-primary" htmlFor="noalcohol">
                  No
                </label>
              </div>
            </div>

            <div className="form-group mt-5">
              <label>How often do you eat junk food per week?</label>
              <br />
              <input
                type="number"
                value={questioner.howOftenDoYouEatJunkFoodPerWeek}
                onChange={(e) =>
                  setQuestioner({
                    howOftenDoYouEatJunkFoodPerWeek: e.target.value,
                  })
                }
                id="inputPassword5"
                className="form-control"
                aria-describedby="passwordHelpBlock"
              />
            </div>

            <div className="form-group mt-5">
              <label>How many glasses of water do you drink per day?</label>
              <br />
              <input
                type="number"
                value={questioner.howManyGlassesOfWaterDoYouDrinkPerDay}
                onChange={(e) => {
                  setQuestioner({
                    howManyGlassesOfWaterDoYouDrinkPerDay: e.target.value,
                  });
                }}
                id="inputPassword5"
                className="form-control"
                aria-describedby="passwordHelpBlock"
              />
            </div>

            <div className="form-group mt-5">
              <label>How many cups of coffee do you drink per day?</label>
              <br />
              <input
                type="number"
                value={questioner.HowManyCupsOfCoffeeDoYouDrinkPerDay}
                onChange={(e) => {
                  setQuestioner({
                    HowManyCupsOfCoffeeDoYouDrinkPerDay: e.target.value,
                  });
                }}
                id="inputPassword5"
                className="form-control"
                aria-describedby="passwordHelpBlock"
              />
            </div>

            <div className="form-group mt-5">
              <label>
                How many glasses of soda drinks do you drink per day?
              </label>
              <br />
              <input
                type="number"
                value={questioner.howManyGlassesOfSodaDrinksDoYouDrinkPerDay}
                onChange={(e) => {
                  setQuestioner({
                    howManyGlassesOfSodaDrinksDoYouDrinkPerDay: e.target.value,
                  });
                }}
                id="inputPassword5"
                className="form-control"
                aria-describedby="passwordHelpBlock"
              />
            </div>

            <div className="form-group mt-5">
              <label>How many meals do you eat per day?</label>
              <br />
              <input
                type="number"
                id="inputPassword5"
                className="form-control"
                value={questioner.howManyMealsDoYouEatPerDay}
                onChange={(e) => {
                  setQuestioner({ howManyMealsDoYouEatPerDay: e.target.value });
                }}
                aria-describedby="passwordHelpBlock"
              />
            </div>

            <div className="form-group mt-5">
              <label>How many vegetable portions do you eat per day ?</label>
              <br />
              <input
                type="number"
                id="inputPassword5"
                className="form-control"
                value={questioner.howManyVegetablePortionsDoYouEatPerDay}
                onChange={(e) => {
                  setQuestioner({
                    howManyVegetablePortionsDoYouEatPerDay: e.target.value,
                  });
                }}
                aria-describedby="passwordHelpBlock"
              />
            </div>
            <div className="form-group mt-5">
              <label>How many fruit portions do you eat per day ?</label>
              <br />
              <input
                type="number"
                id="inputPassword5"
                className="form-control"
                value={questioner.howManyFruitPortionsDoYouEatPerDay}
                onChange={(e) => {
                  setQuestioner({
                    howManyFruitPortionsDoYouEatPerDay: e.target.value,
                  });
                }}
                aria-describedby="passwordHelpBlock"
              />
            </div>

            <div className="form-group mt-5">
              <label>How many protein portions do you eat per day ?</label>
              <br />
              <input
                type="number"
                id="inputPassword5"
                className="form-control"
                value={questioner.howManyProteinPortionsDoYouEatPerDay}
                onChange={(e) => {
                  setQuestioner({
                    howManyProteinPortionsDoYouEatPerDay: e.target.value,
                  });
                }}
                aria-describedby="passwordHelpBlock"
              />
            </div>

            <div className="form-group mt-5">
              <label>How many carbohydrate portions do you eat per day ?</label>
              <br />
              <input
                type="number"
                id="inputPassword5"
                className="form-control"
                value={questioner.howManyCarbohydratePortionsDoYouEatPerDay}
                onChange={(e) => {
                  setQuestioner({
                    howManyCarbohydratePortionsDoYouEatPerDay: e.target.value,
                  });
                }}
                aria-describedby="passwordHelpBlock"
              />
            </div>

            <div className="form-group mt-5">
              <label>How many sweet portions do you eat per day ?</label>
              <br />
              <input
                type="number"
                id="inputPassword5"
                className="form-control"
                value={questioner.howManySweetPortionsDoYouEatPerDay}
                onChange={(e) => {
                  setQuestioner({
                    howManySweetPortionsDoYouEatPerDay: e.target.value,
                  });
                }}
                aria-describedby="passwordHelpBlock"
              />
            </div>
          </Card>
        </Collapse>
        <div>
          <h1 className="text-info mt-3">
            section 2{" "}
            <span>
              <Button
                onClick={() => {
                  setSection2(!section2);
                }}
              >
                {section2 == false ? "+" : "-"}
              </Button>
            </span>
          </h1>
        </div>
        <Collapse in={section2}>
          <Card style={{ backgroundColor: "transparent" }}>
            <div className="form-group mt-5">
              <label>Will you eat spicy food? </label>
              <br />
              <div
                className="btn-group"
                role="group"
                aria-label="Basic radio toggle button group"
              >
                <input
                  type="radio"
                  className="btn-check"
                  name="spicy"
                  id="yesspicy"
                  autoComplete="off"
                  onChange={() => {}}
                  onClick={() => {
                    setQuestioner({ willYouEatSpicyFood: true });
                  }}
                  checked={questioner.willYouEatSpicyFood}
                />
                <label className="btn btn-outline-primary" htmlFor="yesspicy">
                  Yes
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="spicy"
                  id="nospicy"
                  autoComplete="off"
                  onChange={() => {}}
                  onClick={() => {
                    setQuestioner({ willYouEatSpicyFood: false });
                  }}
                  checked={!questioner.willYouEatSpicyFood}
                />
                <label className="btn btn-outline-primary" htmlFor="nospicy">
                  No
                </label>
              </div>
            </div>

            <div className="form-group mt-5">
              <label>Will you eat food containing gluten?</label>
              <br />
              <div
                className="btn-group"
                role="group"
                aria-label="Basic radio toggle button group"
              >
                <input
                  type="radio"
                  className="btn-check"
                  name="gluten"
                  id="yesgluten"
                  autoComplete="off"
                  onChange={() => {}}
                  onClick={() => {
                    setQuestioner({ willYouEatFoodContainingGluten: true });
                  }}
                  checked={questioner.willYouEatFoodContainingGluten}
                />
                <label className="btn btn-outline-primary" htmlFor="yesgluten">
                  Yes
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="gluten"
                  id="nogluten"
                  autoComplete="off"
                  onChange={() => {}}
                  onClick={() => {
                    setQuestioner({ willYouEatFoodContainingGluten: false });
                  }}
                  checked={!questioner.willYouEatFoodContainingGluten}
                />

                <label className="btn btn-outline-primary" htmlFor="nogluten">
                  No
                </label>
              </div>
            </div>

            <div className="form-group mt-5">
              <label>
                Do you have any food allergies \ intolerances ? (If yes, please
                state below)
              </label>
              <br />
              <input
                type="text"
                id="inputPassword5"
                className="form-control"
                aria-describedby="passwordHelpBlock"
                value={questioner.doYouHaveAnyFoodAllergiesOrIntolerances}
                onChange={(e) => {
                  setQuestioner({
                    doYouHaveAnyFoodAllergiesOrIntolerances: e.target.value,
                  });
                }}
              />
            </div>

            <div className="form-group mt-5">
              <label>
                Please state the types of food & beverages you eat in your
                general routine:
              </label>
              <br />
              <input
                type="text"
                id="inputPassword5"
                className="form-control"
                aria-describedby="passwordHelpBlock"
                value={
                  questioner.pleaseStateTheTypesOfFoodAndBeveragesYouEatInYourGeneralRoutine
                }
                onChange={(e) => {
                  setQuestioner({
                    pleaseStateTheTypesOfFoodAndBeveragesYouEatInYourGeneralRoutine:
                      e.target.value,
                  });
                }}
              />
            </div>

            <div className="form-group mt-5">
              <label>
                Are there any foods you cannot \ will not eat? (If yes, please
                state below)
              </label>
              <br />
              <input
                type="text"
                id="inputPassword5"
                className="form-control"
                aria-describedby="passwordHelpBlock"
                value={questioner.areThereAnyFoodsYouCannotOrWillNotEat}
                onChange={(e) => {
                  setQuestioner({
                    areThereAnyFoodsYouCannotOrWillNotEat: e.target.value,
                  });
                }}
              />
            </div>

            <div className="form-group mt-5">
              <label>
                Is there any other information related to food & beverages that
                you would like to add? (If yes, please state below)
              </label>
              <br />
              <input
                type="text"
                id="inputPassword5"
                className="form-control"
                aria-describedby="passwordHelpBlock"
                value={questioner.foodAndBeveragesThatYouWouldLikeToAdd}
                onChange={(e) => {
                  setQuestioner({
                    foodAndBeveragesThatYouWouldLikeToAdd: e.target.value,
                  });
                }}
              />
            </div>

            <div className="form-group mt-5">
              <label>
                Do you currently do exercise? (If yes, please state which
                exercises do you do and how frequent)
              </label>
              <br />
              <input
                type="text"
                id="inputPassword5"
                className="form-control"
                aria-describedby="passwordHelpBlock"
                value={questioner.doYouCurrentlyExercise}
                onChange={(e) => {
                  setQuestioner({ doYouCurrentlyExercise: e.target.value });
                }}
              />
            </div>

            <div className="form-group mt-5">
              <label>
                Did you use to exercise in the past? (If yes, please state which
                exercises did you do)
              </label>
              <br />
              <input
                type="text"
                id="inputPassword5"
                className="form-control"
                aria-describedby="passwordHelpBlock"
                value={questioner.didYouUseToExerciseInThePast}
                onChange={(e) => {
                  setQuestioner({
                    didYouUseToExerciseInThePast: e.target.value,
                  });
                }}
              />
            </div>

            <div className="form-group mt-5">
              <label>
                Is there any other information related to fitness & exercise
                that you would like to add? (If yes, please state below)
              </label>
              <br />
              <input
                type="text"
                id="inputPassword5"
                className="form-control"
                aria-describedby="passwordHelpBlock"
                value={
                  questioner.informationRelatedToFitnessAndExerciseThatYouWouldLikeToAdd
                }
                onChange={(e) => {
                  setQuestioner({
                    informationRelatedToFitnessAndExerciseThatYouWouldLikeToAdd:
                      e.target.value,
                  });
                }}
              />
            </div>
          </Card>
        </Collapse>

        <div>
          <h1 className="text-info mt-3">
            section 3{" "}
            <span>
              <Button
                onClick={() => {
                  setSection3(!section3);
                }}
              >
                {section3 == false ? "+" : "-"}
              </Button>
            </span>
          </h1>
        </div>
        <Collapse in={section3}>
          <Card style={{ backgroundColor: "transparent" }}>
            <div className="form-group mt-5">
              <label>
                Has your doctor ever said that you have a heart condition and
                that you should only do physical activity recommended by a
                doctor?)
              </label>
              <br />

              <div
                className="btn-group"
                role="group"
                aria-label="Basic radio toggle button group"
              >
                <input
                  type="radio"
                  className="btn-check"
                  name="heartCondition"
                  id="yesheartCondition"
                  autoComplete="off"
                  onChange={() => {}}
                  onClick={() => {
                    setQuestioner({ heartCondition: true });
                  }}
                  checked={questioner.heartCondition}
                />

                <label
                  className="btn btn-outline-primary"
                  htmlFor="yesheartCondition"
                >
                  Yes
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="heartCondition"
                  id="noheartCondition"
                  autoComplete="off"
                  onChange={() => {}}
                  onClick={() => {
                    setQuestioner({ heartCondition: false });
                  }}
                  checked={!questioner.heartCondition}
                />

                <label
                  className="btn btn-outline-primary"
                  htmlFor="noheartCondition"
                >
                  No
                </label>
              </div>
            </div>

            <div className="form-group mt-5">
              <label>
                Do you ever feel pain in your chest when you do physical
                activity?
              </label>
              <br />

              <div
                className="btn-group"
                role="group"
                aria-label="Basic radio toggle button group"
              >
                <input
                  type="radio"
                  className="btn-check"
                  name="painInChest"
                  id="yespainInChest"
                  autoComplete="off"
                  onChange={() => {}}
                  onClick={() => {
                    setQuestioner({ feelPainInYourChest: true });
                  }}
                  checked={questioner.feelPainInYourChest}
                />

                <label
                  className="btn btn-outline-primary"
                  htmlFor="yespainInChest"
                >
                  Yes
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="painInChest"
                  id="nopainInChest"
                  autoComplete="off"
                  onChange={() => {}}
                  onClick={() => {
                    setQuestioner({ feelPainInYourChest: false });
                  }}
                  checked={!questioner.feelPainInYourChest}
                />

                <label
                  className="btn btn-outline-primary"
                  htmlFor="nopainInChest"
                >
                  No
                </label>
              </div>
            </div>

            <div className="form-group mt-5">
              <label>Do you ever feel faint or dizzy?</label>
              <br />
              <div
                className="btn-group"
                role="group"
                aria-label="Basic radio toggle button group"
              >
                <input
                  type="radio"
                  className="btn-check"
                  name="faintOrDizzy"
                  id="yesfaintOrDizzy"
                  autoComplete="off"
                  onChange={() => {}}
                  onClick={() => {
                    setQuestioner({ feelFaintOrDizzy: true });
                  }}
                  checked={questioner.feelFaintOrDizzy}
                />

                <label
                  className="btn btn-outline-primary"
                  htmlFor="yesfaintOrDizzy"
                >
                  Yes
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="faintOrDizzy"
                  id="nofaintOrDizzy"
                  autoComplete="off"
                  onChange={() => {}}
                  onClick={() => {
                    setQuestioner({ feelFaintOrDizzy: false });
                  }}
                  checked={!questioner.feelFaintOrDizzy}
                />

                <label
                  className="btn btn-outline-primary"
                  htmlFor="nofaintOrDizzy"
                >
                  No
                </label>
              </div>
            </div>

            <div className="form-group mt-5">
              <label>
                Do you have a joint problem that could be made worse by
                exercise?
              </label>
              <br />
              <div
                className="btn-group"
                role="group"
                aria-label="Basic radio toggle button group"
              >
                <input
                  type="radio"
                  className="btn-check"
                  name="jointProblems"
                  id="yesjointProblems"
                  autoComplete="off"
                  onChange={() => {}}
                  onClick={() => {
                    setQuestioner({ jointProblem: true });
                  }}
                  checked={questioner.jointProblem}
                />

                <label
                  className="btn btn-outline-primary"
                  htmlFor="yesjointProblems"
                >
                  Yes
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="jointProblems"
                  id="nojointProblems"
                  autoComplete="off"
                  onChange={() => {}}
                  onClick={() => {
                    setQuestioner({ jointProblem: false });
                  }}
                  checked={!questioner.jointProblem}
                />

                <label
                  className="btn btn-outline-primary"
                  htmlFor="nojointProblems"
                >
                  No
                </label>
              </div>
            </div>

            <div className="form-group mt-5">
              <label>Have you ever had high\low blood pressure?</label>
              <br />

              <div
                className="btn-group"
                role="group"
                aria-label="Basic radio toggle button group"
              >
                <input
                  type="radio"
                  className="btn-check"
                  name="bloodPressure"
                  id="yesbloodPressure"
                  autoComplete="off"
                  onChange={() => {}}
                  onClick={() => {
                    setQuestioner({ highLowBloodPressure: true });
                  }}
                  checked={questioner.highLowBloodPressure}
                />

                <label
                  className="btn btn-outline-primary"
                  htmlFor="yesbloodPressure"
                >
                  Yes
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="bloodPressure"
                  id="nobloodPressure"
                  autoComplete="off"
                  onChange={() => {}}
                  onClick={() => {
                    setQuestioner({ highLowBloodPressure: false });
                  }}
                  checked={!questioner.highLowBloodPressure}
                />

                <label
                  className="btn btn-outline-primary"
                  htmlFor="nobloodPressure"
                >
                  No
                </label>
              </div>
            </div>

            <div className="form-group mt-5">
              <label>
                Is there any reason why you should not participate in physical
                activity? (If yes, please state below)
              </label>
              <br />
              <input
                type="text"
                id="inputPassword5"
                className="form-control"
                aria-describedby="passwordHelpBlock"
                value={
                  questioner.reasonWhyYouShouldNotParticipateInPhysicalActivity
                }
                onChange={(e) => {
                  setQuestioner({
                    reasonWhyYouShouldNotParticipateInPhysicalActivity:
                      e.target.value,
                  });
                }}
              />
            </div>

            <div className="form-group mt-5">
              <label>
                Are you currently taking any medication of which we should be
                made aware of? (If yes, please state below)
              </label>
              <br />
              <input
                type="text"
                id="inputPassword5"
                className="form-control"
                aria-describedby="passwordHelpBlock"
                value={
                  questioner.takingAnyMedicationOfWhichWeShouldBeMadeAwareOf
                }
                onChange={(e) => {
                  setQuestioner({
                    takingAnyMedicationOfWhichWeShouldBeMadeAwareOf:
                      e.target.value,
                  });
                }}
              />
            </div>

            <div className="form-group mt-5">
              <label>
                Have you had any major\minor surgery should be made aware of?
                (If yes, please state below)
              </label>
              <br />
              <input
                type="text"
                id="inputPassword5"
                className="form-control"
                aria-describedby="passwordHelpBlock"
                value={questioner.majorOrMinorSurgeryShouldBeMadeAwareOf}
                onChange={(e) => {
                  setQuestioner({
                    majorOrMinorSurgeryShouldBeMadeAwareOf: e.target.value,
                  });
                }}
              />
            </div>
          </Card>
        </Collapse>
        <div className="row justify-content-center">
          <button
            className={"btn btn-primary mt-5 mb-5 col-md-6"}
            onClick={saveQuestioner}
          >
            {isUpdate.state ? <span>Update</span> : <span>Add</span>}
          </button>
        </div>
      </div>
    </>
  );
}
