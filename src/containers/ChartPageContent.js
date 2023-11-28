import React, { useState, useEffect, useContext } from "react";
import { dishesContext } from "../context/stateContext";
import { Navbar } from "../components";
import { ChartComponent, ProgressBar } from "../components";
import { capitalize, cloneDeep, shuffle } from "lodash";
import { Link } from "react-router-dom";
import { Box, Button, MenuPaper, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";

export const ChartPageContent = () => {
	const {
		temperature,
		coolingTime,
		dishes,
		setDishes,
		setTemperature,
		numberOfPans,
		numberOfStoves,
		cleaningTime,
		setCoolingTime,
		optimizedState,
		setOptimizedState,
	} = useContext(dishesContext);
	const [progress, setProgress] = useState(0);
	// const [iteration, setIteration] = useState(1);
	const [data, setData] = useState([]);
	const [currentState, setCurrentState] = useState(() => {
		let newDishes = dishes ? cloneDeep(dishes) : [];
		for (let i = 0; i < 10; i++) {
			newDishes = shuffle(newDishes);
		}
		return newDishes;
	}); //shuffle the array
	// useEffect(() => console.log(currentState), []);
	// const [t, setT] = useState(10);
	// const [temperatureIterationIndex, setTemperatureIterationIndex] =
	// 	useState(1);
	const navigate = useNavigate();
	const handleClick = (path) => {
		navigate(`/${path}`);
	};
	const [redirect, setRedirect] = useState("");
	function validation() {
		if (!dishes || dishes.length == 0) {
			setRedirect("You haven't added any dishes, please add some dishes");
		} else if (!numberOfPans && !numberOfStoves && !cleaningTime) {
			setRedirect(
				"You haven't added the logistical details, please fill out the logistical details"
			);
		} else {
			setRedirect("");
		}
	}

	// const anotherFunction = async () => {
	// 	await new Promise((resolve) => {
	// 		setData([{ x: 1, y: 5 }]);
	// 		setTimeout(resolve, 0); // Use setTimeout to create a micro-task and allow the state to update
	// 	});

	// 	for (let i = 2; i <= 1000; i++) {
	// 		await new Promise((resolve) => {
	// 			setData((prevData) => {
	// 				const newData = prevData ? cloneDeep(prevData) : [];
	// 				newData.push({
	// 					x: i,
	// 					y: Math.ceil(Math.random() * (i * 5)),
	// 				});
	// 				return newData;
	// 			});
	// 			setTimeout(resolve, 0); // Use setTimeout to create a micro-task and allow the state to update
	// 		});
	// 	}
	// };

	const nextStateGenerator = (state) => {
		if (!state || state.length < 2) {
			return state;
		}
		const nextState = state ? cloneDeep(state) : [];
		let upperLimit = state.length;
		let index1 = Math.floor(Math.random() * upperLimit);
		let index2 = Math.floor(Math.random() * upperLimit);
		while (index2 === index1) {
			index2 = Math.floor(Math.random() * upperLimit);
		}
		let temp = nextState[index1];
		nextState[index1] = nextState[index2];
		nextState[index2] = temp;
		return nextState;
	};
	const takeNextStep = (probability) => {
		const threshold = Math.random();
		if (probability > threshold) {
			return true;
		}
		return false;
	};
	const costFunction = (state) => {
		if (state && state.length !== 0) {
			let counter = 0;
			let numberOfWashedPans = numberOfPans;
			let newNumberOfStoves = Math.min(numberOfPans, numberOfStoves);
			let timesAndDishes = [];
			let timesAndDishes2 = [];
			let dish;
			for (counter; counter < newNumberOfStoves; counter++) {
				dish = state[counter];
				// console.log("dish", dish);
				dish.stoveCookedOn = counter + 1;
				timesAndDishes.push({ cookedAt: dish.cookingTime, dish: dish });
				timesAndDishes2.push({
					cookedAt: dish.cookingTime,
					dish: dish,
				});
				numberOfWashedPans--;
			}
			timesAndDishes.sort(
				(item1, item2) => item1.cookedAt - item2.cookedAt
			);
			timesAndDishes2.sort(
				(item1, item2) => item1.cookedAt - item2.cookedAt
			);

			for (counter; counter < state.length; counter++) {
				let previousCookingTime = timesAndDishes[0]?.cookedAt || 0;
				let previousStoveCookedOn =
					timesAndDishes[0]?.dish?.stoveCookedOn || 1;
				timesAndDishes.splice(0, 1);
				let firstPossibleCleaningTimeDuration =
					state[counter]?.cookingTime || 0;
				// console.log("previous cooking time", previousCookingTime);
				// console.log("previous stove cooked on", previousStoveCookedOn);
				// console.log(
				// 	"first possible cleaning time duration",
				// 	firstPossibleCleaningTimeDuration
				// );
				let numberToWash;
				let maxCleaningTime;
				let secondPossibleCleaningTimeDuration;
				if (numberOfWashedPans !== 0) {
					dish = state[counter];
					dish.stoveCookedOn = previousStoveCookedOn;
					// dish.cookingTime = dish.cookingTime + previousCookingTime;
					timesAndDishes.push({
						cookedAt: dish.cookingTime + previousCookingTime,
						dish: dish,
					});
					timesAndDishes2.push({
						cookedAt: dish.cookingTime + previousCookingTime,
						dish: dish,
					});
					numberOfWashedPans--;
					timesAndDishes.sort(
						(item1, item2) => item1.cookedAt - item2.cookedAt
					);
					timesAndDishes2.sort(
						(item1, item2) => item1.cookedAt - item2.cookedAt
					);
					secondPossibleCleaningTimeDuration =
						timesAndDishes[0]?.cookedAt - previousCookingTime;
				} else {
					dish = state[counter];
					dish.stoveCookedOn = previousStoveCookedOn;
					// dish.cookingTime =
					// 	dish.cookingTime + previousCookingTime + cleaningTime;
					timesAndDishes.push({
						cookedAt:
							dish.cookingTime +
							cleaningTime +
							previousCookingTime,
						dish: dish,
					});
					timesAndDishes2.push({
						cookedAt:
							dish.cookingTime +
							cleaningTime +
							previousCookingTime,
						dish: dish,
					});
					timesAndDishes.sort(
						(item1, item2) => item1.cookedAt - item2.cookedAt
					);
					timesAndDishes2.sort(
						(item1, item2) => item1.cookedAt - item2.cookedAt
					);
					secondPossibleCleaningTimeDuration =
						timesAndDishes[0]?.cookedAt -
						previousCookingTime -
						cleaningTime;
					numberOfWashedPans++;
					numberOfWashedPans--;
				}
				maxCleaningTime = Math.min(
					firstPossibleCleaningTimeDuration,
					secondPossibleCleaningTimeDuration
				);
				maxCleaningTime = Math.max(maxCleaningTime, 0); //extra validation from my side
				numberToWash = Math.floor(maxCleaningTime / cleaningTime);
				numberToWash =
					numberToWash > numberOfPans - newNumberOfStoves
						? numberOfPans - newNumberOfStoves
						: numberToWash;
				numberOfWashedPans += numberToWash;
			}

			let maxTime = timesAndDishes[timesAndDishes.length - 1]?.cookedAt;
			let coolingTime;
			coolingTime = timesAndDishes2.reduce((accumulator, item) => {
				return accumulator + maxTime - item.cookedAt;
			}, 0);
			// console.log("times and dishes ", timesAndDishes);
			// console.log("times and dishes 2", timesAndDishes2);
			// console.log("cooling time", coolingTime);
			// console.log("max time", maxTime);
			// console.log("**********************");
			// console.log("total cooking time", maxTime);
			return coolingTime;
		}
	};
	// let tInitial = 10;
	// // let t = tInitial;
	// let alpha = 0.9;
	// let tMin = 0.1;
	// let nextState;
	// let eCurrentState;
	// let eNextState;
	// let deltaE;
	// let probability;
	// let decision;
	// // let iteration = 1;
	// // let temperatureIterationIndex = 1;
	// let temperatureIterationMaxIndex = 100;
	useEffect(() => {
		validation();
		if (redirect === "") {
			simulatedAnnealing();
		}
	}, [redirect]);
	// useEffect(() => {
	// 	// setOptimizedState(null);
	// 	// setProgress(0);
	// 	// validation();
	// 	if (redirect === "") {
	// 		setData([{ x: iteration, y: costFunction(currentState) }]);
	// 		console.log("came here1");

	// 		if (t > tMin) {
	// 			if (temperatureIterationIndex <= temperatureIterationMaxIndex) {
	// 				console.log("iteration", iteration);
	// 				console.log("temperature", t);
	// 				console.log("current state", currentState);
	// 				console.log(
	// 					"temperature iteration index",
	// 					temperatureIterationIndex
	// 				);
	// 				console.log("came here2");

	// 				// temperatureIterationIndex++;
	// 				nextState = nextStateGenerator(currentState);
	// 				eCurrentState = costFunction(currentState);
	// 				eNextState = costFunction(nextState);
	// 				deltaE = eNextState - eCurrentState;
	// 				if (deltaE < 0) {
	// 					setTemperatureIterationIndex(
	// 						(prevTemperatureIterationIndex) =>
	// 							prevTemperatureIterationIndex + 1
	// 					);
	// 					setCurrentState((prevState) => {
	// 						console.log("came here3");
	// 						return nextState;
	// 					});
	// 				} else {
	// 					console.log("came here4");
	// 					probability = 1.0 / (1 + Math.exp(deltaE / t));
	// 					// console.log("probability", probability);
	// 					decision = takeNextStep(probability);
	// 					// console.log("decision", decision);
	// 					if (decision) {
	// 						console.log("came here 5");
	// 						setTemperatureIterationIndex(
	// 							(prevTemperatureIterationIndex) =>
	// 								prevTemperatureIterationIndex + 1
	// 						);
	// 						setCurrentState((prevState) => nextState);
	// 					} else {
	// 						console.log("came here 6");
	// 						setTemperatureIterationIndex(
	// 							(prevTemperatureIterationIndex) =>
	// 								prevTemperatureIterationIndex + 1
	// 						);
	// 						setCurrentState(cloneDeep(currentState));
	// 					}
	// 				}
	// 			} else {
	// 				// t = t * alpha >= tMin ? t * alpha : tMin;
	// 				console.log("came here 7");
	// 				setT((prevT) =>
	// 					prevT * alpha >= tMin ? prevT * alpha : tMin
	// 				);
	// 				// iteration++;
	// 				setIteration((prevIteration) => prevIteration + 1);
	// 				setTemperatureIterationIndex(1);
	// 				// temperatureIterationIndex = 1;
	// 				setProgress((prevProgress) => {
	// 					let completed = tInitial - t;
	// 					let total = tInitial - tMin;
	// 					let percentageCompleted = (completed / total) * 100;
	// 					return percentageCompleted;
	// 				});
	// 				setData((prevData) => {
	// 					const newData = prevData ? cloneDeep(prevData) : [];
	// 					newData.push({ x: iteration, y: costFunction(dishes) });
	// 					return newData;
	// 				});
	// 			}
	// 		} else {
	// 			console.log("came here 8");
	// 			setTemperatureIterationIndex(1);
	// 			setIteration(1);
	// 			setOptimizedState(currentState);
	// 		}
	// 	}
	// }, [
	// 	currentState,
	// 	iteration,
	// 	t,
	// 	temperatureIterationIndex,
	// 	temperatureIterationMaxIndex,
	// ]);
	let dataPoints = [];
	// useEffect(() => console.log(dataPoints), [dataPoints]);
	console.log(dataPoints);
	const simulatedAnnealing = async () => {
		await new Promise((resolve) => {
			setOptimizedState(null);
			setTimeout(resolve, 0); // Use setTimeout to create a micro-task and allow the state to update
		});
		let tInitial = 10000;
		let t = tInitial;
		let alpha = 0.99;
		let tMin = 1;
		// console.log("dishes", currentState);
		let nextState;
		let eCurrentState;
		let eNextState;
		let deltaE;
		let probability;
		let decision;
		let iteration = 1;
		let localCurrentState = currentState;

		await new Promise((resolve) => {
			setData([{ x: iteration, y: costFunction(localCurrentState) }]);
			setTimeout(resolve, 0); // Use setTimeout to create a micro-task and allow the state to update
		});

		dataPoints.push({ x: iteration, y: costFunction(localCurrentState) });
		await new Promise((resolve) => {
			setProgress(0);
			setTimeout(resolve, 0); // Use setTimeout to create a micro-task and allow the state to update
		});

		while (t > tMin) {
			// console.log("temperature", temperature);
			// console.log("---");
			// console.log("coolingTime", coolingTime);
			for (let i = 0; i < 100; i++) {
				nextState = nextStateGenerator(localCurrentState);
				eCurrentState = costFunction(localCurrentState);
				eNextState = costFunction(nextState);
				deltaE = eNextState - eCurrentState;
				console.log("iteration", iteration);
				console.log("temperature", t);
				console.log("current state", localCurrentState);
				console.log(
					"cost of current state",
					costFunction(localCurrentState)
				);
				console.log("delta e", deltaE);
				console.log("next state", nextState);
				console.log("cost of next state", costFunction(nextState));
				console.log("data points", dataPoints);
				if (deltaE < 0) {
					// await new Promise((resolve) => {
					// 	setCurrentState(nextState);
					// 	setTimeout(resolve, 0); // Use setTimeout to create a micro-task and allow the state to update
					// });
					localCurrentState = nextState;
					// flushSync(() => {
					// 	setCurrentState(nextState);
					// });
				} else {
					probability = 1.0 / Math.exp(deltaE / t);
					console.log("probability", probability);
					decision = takeNextStep(probability);
					console.log("decision", decision);
					if (decision) {
						// console.log("inside decision");
						// await new Promise((resolve) => {
						// 	setCurrentState((prevState) => nextState);
						// 	setTimeout(resolve, 0); // Use setTimeout to create a micro-task and allow the state to update
						// });
						localCurrentState = nextState;
					}
				}
			}
			t = t * alpha >= tMin ? t * alpha : tMin;
			iteration++;
			await new Promise((resolve) => {
				setProgress((prevProgress) => {
					let completed = tInitial - t;
					let total = tInitial - tMin;
					let percentageCompleted = (completed / total) * 100;
					return percentageCompleted;
				});
				setTimeout(resolve, 0); // Use setTimeout to create a micro-task and allow the state to update
			});

			dataPoints.push({
				x: iteration,
				y: costFunction(localCurrentState),
			});
			await new Promise((resolve) => {
				setData((prevData) => {
					const newData = prevData ? cloneDeep(prevData) : [];
					newData.push({
						x: iteration,
						y: costFunction(localCurrentState),
					});
					return newData;
				});
				setTimeout(resolve, 0); // Use setTimeout to create a micro-task and allow the state to update
			});
		}
		// await new Promise((resolve) => {
		// 	setTimeout(resolve, 0); // Use setTimeout to create a micro-task and allow the state to update
		// });
		console.log("final data points", dataPoints);
		// setData(dataPoints);
		setOptimizedState(localCurrentState);
	};

	return (
		<Box
			sx={{
				// position: "absolute",
				// top: 0,
				// bottom: 0,
				// left: 0,
				// right: 0,
				// zIndex: -1,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{/* {!redirect && (
				<ChartComponent
					x={temperature}
					y={coolingTime}
				></ChartComponent>
			)} */}
			{!redirect && (
				<Box>
					<ChartComponent data={data} progress={progress} />
				</Box>
			)}

			{redirect && (
				<Paper elevation={1} sx={{ p: 4 }}>
					<Typography sx={{ mb: 2.5, color: "text.secondary" }}>
						{redirect}
					</Typography>
					<Button
						// color="inherit"
						onClick={() =>
							handleClick(
								redirect.includes("dishes")
									? "dishes"
									: "logistics"
							)
						}
						variant="contained"
					>
						Go to{" "}
						{redirect.includes("dishes") ? "dishes" : "logistics"}
					</Button>
				</Paper>
			)}
		</Box>
	);
};
