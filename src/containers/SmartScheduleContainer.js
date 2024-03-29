//This container is used to generate the smart schedule by accessing the optimized state from the stateContext and subsequently determining the schedule and computing the cumulative and average cooling times and also imports the SmartScheduleContent component, required to accomplish the aforementioned tasks.

import React, { useState, useEffect, useContext } from "react";
import { dishesContext } from "../context/stateContext";
import { useNavigate } from "react-router-dom";
import { SmartScheduleContent } from "../components";
import { Box, Button, Paper, Typography } from "@mui/material";
export const SmartScheduleContainer = () => {
	const {
		dishes,
		numberOfPans,
		numberOfStoves,
		cleaningTime,
		optimizedState,
	} = useContext(dishesContext);
	const navigate = useNavigate();
	const [redirect, setRedirect] = useState("");

	//This function checks if the user has added necessary details pertaining to dishes and logistics, and performed simulated annealing
	function validation() {
		if (!dishes || dishes.length === 0) {
			setRedirect("You haven't added any dishes, please add some dishes");
		} else if (!numberOfPans && !numberOfStoves && !cleaningTime) {
			setRedirect(
				"You haven't added the logistical details, please fill out the logistical details"
			);
		} else if (!optimizedState) {
			setRedirect(
				"You haven't performed simulated annealing, please perform simulated annealing"
			);
		} else {
			setRedirect("");
		}
	}

	//This function allows facilitates user friendly navigation to appropriate sections in case the user hasnt performed all the prerequisites needed to generate the smart schedule
	const handleClick = (path) => {
		navigate(`/${path}`);
	};

	//This essentially invokes the validation function and generates the schedule if the user has performed all the prerequisites needed to generate the smart schedule and displays it in a user friendly format
	useEffect(() => {
		validation();
		if (redirect === "") {
			logger(optimizedState);
		}
	}, [redirect, optimizedState]);

	const [logContent, setLogContent] = useState("");

	//This function basically computes the total and average cooling time for the optimized state generated after performing Simulated Annealing
	const logger = async (state) => {
		if (state && state.length != 0) {
			let counter = 0;
			let numberOfWashedPans = numberOfPans;
			let newNumberOfStoves = Math.min(numberOfPans, numberOfStoves);
			let timesAndDishes = [];
			let timesAndDishes2 = [];
			let dish;
			await new Promise((resolve) => {
				setLogContent(
					"The following schedule has been generated using the Simulated Annealing Algorithm in a bid to minimize the overall cooling time"
				);
				setTimeout(resolve, 0);
			});
			await new Promise((resolve) => {
				setLogContent((prevLogContent) => {
					let newLogContent = prevLogContent;
					newLogContent += "----------At the 0th minute:\n";
					return newLogContent;
				});
				setTimeout(resolve, 0);
			});
			for (counter; counter < newNumberOfStoves; counter++) {
				dish = state[counter];

				dish.stoveCookedOn = counter + 1;
				timesAndDishes.push({ cookedAt: dish.cookingTime, dish: dish });
				timesAndDishes2.push({
					cookedAt: dish.cookingTime,
					dish: dish,
				});
				await new Promise((resolve) => {
					setLogContent((prevLogContent) => {
						let newLogContent = prevLogContent;
						newLogContent +=
							"\n\tCook " +
							dish.dishName +
							" on stove " +
							dish.stoveCookedOn +
							" (" +
							dish.cookingTime +
							" minutes)";
						return newLogContent;
					});
					setTimeout(resolve, 0);
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
				let previousCookingTime =
					(timesAndDishes && timesAndDishes[0]?.cookedAt) || 0;
				let previousStoveCookedOn =
					(timesAndDishes &&
						timesAndDishes[0]?.dish?.stoveCookedOn) ||
					1;
				timesAndDishes?.splice(0, 1);
				let firstPossibleCleaningTimeDuration =
					state[counter]?.cookingTime || 0;
				let numberToWash;
				let maxCleaningTime;
				let secondPossibleCleaningTimeDuration;
				if (numberOfWashedPans !== 0) {
					dish = state && state[counter];
					dish.stoveCookedOn = previousStoveCookedOn;
					timesAndDishes.push({
						cookedAt: dish.cookingTime + previousCookingTime,
						dish: dish,
					});
					timesAndDishes2.push({
						cookedAt: dish.cookingTime + previousCookingTime,
						dish: dish,
					});

					await new Promise((resolve) => {
						setLogContent((prevLogContent) => {
							let newLogContent = prevLogContent;
							let matchText = new RegExp(
								`At the ${previousCookingTime}th minute`
							);

							if (matchText.test(newLogContent)) {
								newLogContent +=
									"\n\tCook " +
									dish.dishName +
									" on stove " +
									dish.stoveCookedOn +
									" (" +
									dish.cookingTime +
									" minutes)";
							} else {
								newLogContent +=
									"----------At the " +
									previousCookingTime +
									"th minute:\n" +
									"\n\tCook " +
									dish.dishName +
									" on stove " +
									dish.stoveCookedOn +
									" (" +
									dish.cookingTime +
									" minutes)";
							}
							return newLogContent;
						});
						setTimeout(resolve, 0);
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
					dish = state && state[counter];
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
					await new Promise((resolve) => {
						setLogContent((prevLogContent) => {
							let newLogContent = prevLogContent;
							let matchText = new RegExp(
								`At the ${previousCookingTime}th minute`
							);
							if (matchText.test(newLogContent)) {
								newLogContent +=
									"\n\tWash a pan (" +
									cleaningTime +
									" minutes)" +
									"\n\tCook " +
									dish.dishName +
									" on stove " +
									dish.stoveCookedOn +
									" (" +
									dish.cookingTime +
									" minutes)";
							} else {
								newLogContent +=
									"----------At the " +
									previousCookingTime +
									"th minute:\n" +
									"\n\tWash a pan (" +
									cleaningTime +
									" minutes)" +
									"\n\tCook " +
									dish.dishName +
									" on stove " +
									dish.stoveCookedOn +
									" (" +
									dish.cookingTime +
									" minutes)";
							}
							return newLogContent;
						});
						setTimeout(resolve, 0);
					});

					numberOfWashedPans++;
					numberOfWashedPans--;
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
				}
				maxCleaningTime = Math.min(
					firstPossibleCleaningTimeDuration,
					secondPossibleCleaningTimeDuration
				);
				maxCleaningTime = Math.max(maxCleaningTime, 0);
				numberToWash = Math.floor(maxCleaningTime / cleaningTime);
				numberToWash =
					numberToWash > numberOfPans - newNumberOfStoves
						? numberOfPans - newNumberOfStoves
						: numberToWash;
				numberOfWashedPans += numberToWash;
				if (numberToWash != 0) {
					if (
						firstPossibleCleaningTimeDuration <
						secondPossibleCleaningTimeDuration
					) {
						if (numberToWash === 1) {
							await new Promise((resolve) => {
								setLogContent((prevLogContent) => {
									let newLogContent = prevLogContent;
									newLogContent +=
										"\n\tWash 1 pan until " +
										dish.dishName +
										" gets cooked ";
									return newLogContent;
								});
								setTimeout(resolve, 0);
							});
						} else {
							await new Promise((resolve) => {
								setLogContent((prevLogContent) => {
									let newLogContent = prevLogContent;
									newLogContent +=
										"\n\tWash " +
										numberToWash +
										" pans until " +
										dish.dishName +
										" gets cooked ";
									return newLogContent;
								});
								setTimeout(resolve, 0);
							});
						}
					} else {
						if (numberToWash === 1) {
							await new Promise((resolve) => {
								setLogContent((prevLogContent) => {
									let newLogContent = prevLogContent;
									newLogContent +=
										"\n\tWash 1 pan until " +
										timesAndDishes[0]?.dish?.dishName +
										" gets cooked ";
									return newLogContent;
								});
								setTimeout(resolve, 0);
							});
						} else {
							await new Promise((resolve) => {
								setLogContent((prevLogContent) => {
									let newLogContent = prevLogContent;
									newLogContent +=
										"\n\tWash " +
										numberToWash +
										" pans until " +
										timesAndDishes[0]?.dish?.dishName +
										" gets cooked ";
									return newLogContent;
								});
								setTimeout(resolve, 0);
							});
						}
					}
				}
			}

			let maxTime = timesAndDishes[timesAndDishes.length - 1]?.cookedAt;
			let coolingTime;
			coolingTime = timesAndDishes2.reduce((accumulator, item) => {
				return accumulator + maxTime - item.cookedAt;
			}, 0);
			await new Promise((resolve) => {
				setLogContent((prevLogContent) => {
					let newLogContent =
						prevLogContent +
						"----------Total Minimum Cooling Time for all dishes is " +
						coolingTime +
						" minutes" +
						"\nAverage Minimum Cooling Time per dish is " +
						(coolingTime / optimizedState?.length).toFixed(2) +
						" minutes";
					return newLogContent;
				});
				setTimeout(resolve, 0);
			});
		}
	};
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{!redirect && <SmartScheduleContent content={logContent} />}
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
									: redirect.includes("logistical")
									? "logistics"
									: "simulated-annealing"
							)
						}
						variant="contained"
					>
						Go to{" "}
						{redirect.includes("dishes")
							? "dishes"
							: redirect.includes("logistical")
							? "logistics"
							: "simulated annealing"}
					</Button>
				</Paper>
			)}
		</Box>
	);
};
