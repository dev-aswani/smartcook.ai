//This container performs the simulated annealing and is used to generate the graphical reperesentation of the simulated annealing algorithm along with the progress bar that depicts the percentage completion at any point within the algorithm's execution time and also imports the necessary components required to accomplish the aofrementioned tasks.

import React, { useState, useEffect, useContext } from "react";
import { dishesContext } from "../context/stateContext";
import { SimulatedAnnealingChart } from "../components";
import { cloneDeep, shuffle } from "lodash";
import { Box, Button, MenuPaper, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const SimulatedAnnealingContainer = ({ success, setSuccess }) => {
	const {
		dishes,
		numberOfPans,
		numberOfStoves,
		cleaningTime,
		setOptimizedState,
	} = useContext(dishesContext);

	const [progress, setProgress] = useState(0);

	const [data, setData] = useState([]);

	const [currentState, setCurrentState] = useState(() => {
		let newDishes = dishes ? cloneDeep(dishes) : [];
		for (let i = 0; i < 10; i++) {
			newDishes = shuffle(newDishes);
		}
		return newDishes;
	});

	const navigate = useNavigate();

	const handleClick = (path) => {
		navigate(`/${path}`);
	};
	const [redirect, setRedirect] = useState("");

	//This function checks if the user has added necessary details pertaining to dishes and logistics
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

	//This essentially invokes the validation function and performs the algorithm if the user has performed all the prerequisites needed to do so
	useEffect(() => {
		validation();
		if (redirect === "") {
			simulatedAnnealing();
		}
	}, [redirect]);

	//This function accepts a state and randomly generates neigboring state by swapping 2 elements
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

	//This function accepts an acceptance probability and is used to decide whether or not to accept a potentially worse state
	const takeNextStep = (probability) => {
		const threshold = Math.random();
		if (probability > threshold) {
			return true;
		}
		return false;
	};

	//This function accepts a state computes the corresponding objective function, viz. the cumulative cooling time, based on a smart constraint based design
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

			return coolingTime;
		}
	};

	let dataPoints = [];

	//This function performs simulated annealing and returns the optimized state when the annealing temperature which is set to the initial temperature is reduced to the final temperature
	const simulatedAnnealing = async () => {
		await new Promise((resolve) => {
			setOptimizedState(null);
			setTimeout(resolve, 0); // Use setTimeout to create a micro-task and allow the state to update
		});
		let tInitial = 10000;
		let t = tInitial;
		let alpha = 0.99;
		let tMin = 1;
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
					localCurrentState = nextState;
				} else {
					probability = 1.0 / Math.exp(deltaE / t);
					console.log("probability", probability);
					decision = takeNextStep(probability);
					console.log("decision", decision);
					if (decision) {
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

		setSuccess(
			"Simulated annealing is now complete, and the smart schedule has been made available for your perusal."
		);
		setOptimizedState(localCurrentState);
	};

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{!redirect && (
				<Box>
					<SimulatedAnnealingChart data={data} progress={progress} />
				</Box>
			)}

			{redirect && (
				<Paper elevation={1} sx={{ p: 4 }}>
					<Typography sx={{ mb: 2.5, color: "text.secondary" }}>
						{redirect}
					</Typography>
					<Button
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
