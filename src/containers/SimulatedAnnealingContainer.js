//This container performs the simulated annealing by accessing the simulated annealing function from the stateContext. It displays a graphical representation of the simulated annealing algorithm along with the progress bar that depicts the percentage completion at any point within the algorithm's execution time and also imports the necessary components required to accomplish the aforementioned tasks.

import React, { useState, useEffect, useContext } from "react";
import { dishesContext } from "../context/stateContext";
import { SimulatedAnnealingChart } from "../components";

import { Box, Button, MenuPaper, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const SimulatedAnnealingContainer = ({}) => {
	const {
		dishes,
		numberOfPans,
		numberOfStoves,
		cleaningTime,
		setOptimizedState,
		optimizedState,
		progress,
		setProgress,
		data,
		simulatedAnnealing,
	} = useContext(dishesContext);

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
			if (!optimizedState && progress > 0) {
				return;
			}
			simulatedAnnealing();
		}
	}, [redirect]);

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
