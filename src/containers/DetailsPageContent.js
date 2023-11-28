import React, { useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { theme } from "../utils";
import { dishesContext } from "../context/stateContext";
import { SuccessAlert } from "../components";
export const DetailsPageContent = ({ success, setSuccess }) => {
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
	const handleSaveClick = () => {
		setNumberOfPans(currentNumberOfPans);
		setNumberOfStoves(currentNumberOfStoves);
		setCleaningTime(currentCleaningTime);
		setSuccess("Logistical details successfully saved!");
	};

	return (
		<Box
			sx={{
				// position: "absolute",
				// top: 0,
				// left: 0,
				// right: 0,
				// bottom: 0,
				// zIndex: -1,
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
