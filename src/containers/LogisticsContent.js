//This container is used to read and update the user input pertaining to logistical details such as the number of pans, the number of stoves, and the cleaning time, and also performs the necessary validation while at it

import React, { useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { theme } from "../utils";
import { dishesContext } from "../context/stateContext";
export const LogisticsContent = ({ success, setSuccess }) => {
	const {
		numberOfPans,
		setNumberOfPans,
		numberOfStoves,
		setNumberOfStoves,
		cleaningTime,
		setCleaningTime,
	} = useContext(dishesContext);

	const [cleaningTimeError, setCleaningTimeError] = useState(null);

	const [numberOfPansError, setNumberOfPansError] = useState(null);

	const [numberOfStovesError, setNumberOfStovesError] = useState(null);

	const [currentNumberOfPans, setCurrentNumberOfPans] =
		useState(numberOfPans);

	const [currentNumberOfStoves, setCurrentNumberOfStoves] =
		useState(numberOfStoves);

	const [currentCleaningTime, setCurrentCleaningTime] =
		useState(cleaningTime);

	//This function is used to save the data inputted by the user, by updating the state variables accessed from the stateContext.
	const handleSaveClick = () => {
		setNumberOfPans(currentNumberOfPans);
		setNumberOfStoves(currentNumberOfStoves);
		setCleaningTime(currentCleaningTime);
		setSuccess("Logistical details successfully saved!");
	};

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Paper
				sx={{
					mt: 3.5,
					pt: 4,
					pb: 6,
					height: "auto",
					width: 500,
					px: "4rem",
					mx: "auto",
					textAlign: "center",
					display: "flex",
					justifyContent: "space-between",
					flexDirection: "column",
				}}
				elevation={1}
			>
				<Box>
					<Typography
						variant="h2"
						sx={{
							background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
						}}
						gutterBottom
					>
						Details
					</Typography>

					<TextField
						value={currentNumberOfPans ?? ""}
						autoFocus
						margin="dense"
						id="numberOfPans"
						label="Number Of Pans"
						type="number"
						fullWidth
						variant="standard"
						sx={{ mb: 1, color: "text.secondary" }}
						//This function is used to perform the necessary validation when reading user input for the number of pans. It ensures that users only input positive integral values for the number of pans, and sets the local state variables, emulating the concept of controlled components in React.
						onChange={(event) => {
							let value = event.target.value;
							if (currentNumberOfPans && value === "") {
								setNumberOfPansError(
									"Number of pans is required"
								);
							} else if (parseInt(value) != value) {
								setNumberOfPansError(
									"Number of pans must be integral"
								);
							} else if (parseInt(value) <= 0) {
								setNumberOfPansError(
									"Number of pans must be positive"
								);
							} else {
								setNumberOfPansError(null);
							}
							setCurrentNumberOfPans(parseInt(value) || "");
						}}
						error={numberOfPansError ? true : false}
						helperText={numberOfPansError}
					/>
					<TextField
						value={currentNumberOfStoves ?? ""}
						margin="dense"
						id="numberOfStoves"
						label="Number Of Stoves"
						type="number"
						fullWidth
						variant="standard"
						sx={{ mb: 1, color: "text.secondary" }}
						//This function is used to perform the necessary validation when reading user input for the number of stoves. It ensures that users only input positive integral values for the number of stoves, and sets the local state variables, emulating the concept of controlled components in React.
						onChange={(event) => {
							let value = event.target.value;
							if (currentNumberOfStoves && value === "") {
								setNumberOfStovesError(
									"Number of stoves is required"
								);
							} else if (parseInt(value) != value) {
								setNumberOfStovesError(
									"Number of stoves must be integral"
								);
							} else if (parseInt(value) <= 0) {
								setNumberOfStovesError(
									"Number of stoves must be positive"
								);
							} else {
								setNumberOfStovesError(null);
							}
							setCurrentNumberOfStoves(parseInt(value) || "");
						}}
						error={numberOfStovesError ? true : false}
						helperText={numberOfStovesError}
					/>
					<TextField
						value={currentCleaningTime ?? ""}
						//This function is used to perform the necessary validation when reading user input for the cleaning time of a pan. It ensures that users only input positive integral values for the cleaning time of a pan, and sets the local state variables, emulating the concept of controlled components in React.
						onChange={(event) => {
							let value = event.target.value;
							if (currentCleaningTime && value === "") {
								setCleaningTimeError(
									"Cleaning time is required"
								);
							} else if (parseInt(value) != value) {
								setCleaningTimeError(
									"Cleaning time must be integral"
								);
							} else if (parseInt(value) <= 0) {
								setCleaningTimeError(
									"Cleaning time must be positive"
								);
							} else {
								setCleaningTimeError(null);
							}
							setCurrentCleaningTime(parseInt(value) || "");
						}}
						margin="dense"
						id="cleaningTime"
						label="Cleaning Time"
						type="number"
						fullWidth
						variant="standard"
						sx={{ mb: 1, color: "text.secondary" }}
						error={cleaningTimeError ? true : false}
						helperText={cleaningTimeError}
					/>
				</Box>
				<Button
					variant="contained"
					onClick={handleSaveClick}
					size="large"
					sx={{ textTransform: "none", mt: 3 }}
					disabled={
						(numberOfPans === currentNumberOfPans &&
							numberOfStoves === currentNumberOfStoves &&
							cleaningTime === currentCleaningTime) ||
						!currentNumberOfPans ||
						!currentNumberOfStoves ||
						!currentCleaningTime ||
						numberOfPansError ||
						numberOfStovesError ||
						cleaningTimeError
					}
				>
					Save
				</Button>
			</Paper>
		</Box>
	);
};
