import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Typography, TextField, Stack } from "@mui/material";
import { dishesData } from "../constants";
import { DishList, DishInput } from "../components";
import { SuccessAlert } from "../components";
export const MainContent = () => {
	const [editModeIndex, setEditModeIndex] = useState(null);
	const [success, setSuccess] = useState(null);
	return (
		<>
			<SuccessAlert
				success={success}
				setSuccess={setSuccess}
			></SuccessAlert>
			<DishInput
				editModeIndex={editModeIndex}
				setEditModeIndex={setEditModeIndex}
				setSuccess={setSuccess}
			/>
			<DishList
				setEditModeIndex={setEditModeIndex}
				setSuccess={setSuccess}
			/>
		</>
	);
};
