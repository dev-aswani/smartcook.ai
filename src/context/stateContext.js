//This is a React Context named stateContext which maintains various state variables and facilitates simultaneous availability across multiple components

import { createContext, useEffect, useState } from "react";
import { dishesData } from "../constants";
import { cloneDeep, shuffle } from "lodash";

export const dishesContext = createContext();
export const Provider = ({ children }) => {
	const [dishes, setDishes] = useState(dishesData);

	const [numberOfPans, setNumberOfPans] = useState(null);

	const [numberOfStoves, setNumberOfStoves] = useState(null);

	const [cleaningTime, setCleaningTime] = useState(null);

	const [temperature, setTemperature] = useState(null);

	const [coolingTime, setCoolingTime] = useState(null);

	const [optimizedState, setOptimizedState] = useState(null);

	const [progress, setProgress] = useState(0);

	const [data, setData] = useState([]);

	const [currentState, setCurrentState] = useState(() => {
		let newDishes = dishes ? cloneDeep(dishes) : [];
		for (let i = 0; i < 10; i++) {
			newDishes = shuffle(newDishes);
		}
		return newDishes;
	});
	const [success, setSuccess] = useState(null);

	useEffect(() => {
		const setInitial = async () => {
			await new Promise((resolve) => {
				setOptimizedState(null);
				setProgress(0);
				setData([]);
				setTimeout(resolve, 0);
			});
		};
		setInitial();
	}, [numberOfPans, numberOfStoves, cleaningTime, dishes]);

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
			//incase the number of stoves and pans are not equal this variable stores the minimum of those two
			let newNumberOfStoves = Math.min(numberOfPans, numberOfStoves);

			//This array is used to  to store the cumulative time for each stove and the dish, paired with the dish currently being prepared. It is at all times, sorted in the ascending order of cookedAt attribue

			let timesAndDishes = [];

			//This array is used for calculating the effective cooling time
			let timesAndDishes2 = [];
			let dish;

			//This loop corresponds to placing the very first batch of dishes on the stoves
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

			//sorting timesAndDishes
			timesAndDishes.sort(
				(item1, item2) => item1.cookedAt - item2.cookedAt
			);

			//sorting timesAndDishes2
			timesAndDishes2.sort(
				(item1, item2) => item1.cookedAt - item2.cookedAt
			);

			//This corresponds to handling the remaining dishes based on pan-stove availability, after the dishes in the very first batch are cooked.
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

				//This represents the time available to clean the pans while dishes are being cooked to effectively utilize time
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

			//This represents the cumulative cooking time
			let maxTime = timesAndDishes[timesAndDishes.length - 1]?.cookedAt;

			//This represents the cumulative cooling time
			let coolingTime;
			coolingTime = timesAndDishes2.reduce((accumulator, item) => {
				return accumulator + maxTime - item.cookedAt;
			}, 0);

			return coolingTime;
		}
	};
	//Local variable to hold the data points required for dynamically plotting the graph
	// let dataPoints = [];

	//This function performs simulated annealing and returns the optimized state when the annealing temperature which is set to the initial temperature is reduced to the final temperature
	const simulatedAnnealing = async () => {
		if (optimizedState) return;
		let tInitial = 10000;

		//Annealing temperature set to initial temperature at the beginning of the algorithm
		let t = tInitial;

		//This represents the cooling factor
		let alpha = 0.99;

		//This represents the terminal temperature, and is used as the stopping condition of the algorithm
		let tMin = 1;

		//This represents a neigboring state
		let nextState;

		//This represents the cumulative cooling time of the current state
		let eCurrentState;

		//This represnts the cumulative cooling time of the neigboring state
		let eNextState;

		//This represents the difference in the cooling times of the neigboring and current states
		let deltaE;

		//This represents the acceptance probability of a potentially worse state
		let probability;

		//This represents the decision to take based on the acceptance probability
		let decision;

		//This represents the iteration corresponding to a particular temperature
		let iteration = 1;
		let localCurrentState = currentState;

		await new Promise((resolve) => {
			setData([{ x: iteration, y: costFunction(localCurrentState) }]);
			setTimeout(resolve, 0);
		});

		// dataPoints.push({ x: iteration, y: costFunction(localCurrentState) });

		while (t > tMin) {
			//This loop represents spending a particular amount of time, in this case 100 sub iterations at a particular temperature and then decreasing the temperature by the cooling factor
			for (let i = 0; i < 100; i++) {
				nextState = nextStateGenerator(localCurrentState);
				eCurrentState = costFunction(localCurrentState);
				eNextState = costFunction(nextState);
				deltaE = eNextState - eCurrentState;
				if (deltaE < 0) {
					localCurrentState = nextState;
				} else {
					//Acceptance probability calculated using the Metropolis criterion
					probability = 1.0 / Math.exp(deltaE / t);
					decision = takeNextStep(probability);
					if (decision) {
						localCurrentState = nextState;
					}
				}
			}
			//Decreasing the annealing temperature by the cooling factor
			t = t * alpha >= tMin ? t * alpha : tMin;
			iteration++;
			await new Promise((resolve) => {
				setProgress((prevProgress) => {
					let completed = tInitial - t;
					let total = tInitial - tMin;
					let percentageCompleted = (completed / total) * 100;
					return percentageCompleted;
				});
				setTimeout(resolve, 0);
			});

			// dataPoints.push({
			// 	x: iteration,
			// 	y: costFunction(localCurrentState),
			// });
			//Setting the state, data, passed to the SimulatedAnnealingChart component that is used for dynamically plotting the graph
			await new Promise((resolve) => {
				setData((prevData) => {
					const newData = prevData ? cloneDeep(prevData) : [];
					newData.push({
						x: iteration,
						y: costFunction(localCurrentState),
					});
					return newData;
				});
				setTimeout(resolve, 0);
			});
		}

		setSuccess(
			"Simulated annealing is now complete, and the smart schedule has been made available for your perusal."
		);
		//Setting the optimized state at the end of the algorithm
		setOptimizedState(localCurrentState);
	};

	return (
		<dishesContext.Provider
			value={{
				dishes,
				setDishes,
				numberOfPans,
				setNumberOfPans,
				numberOfStoves,
				setNumberOfStoves,
				cleaningTime,
				setCleaningTime,
				temperature,
				setTemperature,
				coolingTime,
				setCoolingTime,
				optimizedState,
				setOptimizedState,
				progress,
				setProgress,
				data,
				setData,
				simulatedAnnealing,
				success,
				setSuccess,
			}}
		>
			{children}
		</dishesContext.Provider>
	);
};
