import { useEffect, useState, useContext } from "react";
import { dishesContext } from "../context/stateContext";
import { capitalize, cloneDeep } from "lodash";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const DishInput = ({ editModeIndex, setEditModeIndex, setSuccess }) => {
	const { dishes, setDishes } = useContext(dishesContext);
	const [open, setOpen] = useState(false);
	const [dishName, setDishName] = useState(null);
	const [cookingTime, setCookingTime] = useState(null);
	const [dishNameError, setDishNameError] = useState(null);
	const [cookingTimeError, setCookingTimeError] = useState(null);
	// console.log(dishes);
	useEffect(() => {
		if (editModeIndex !== null) {
			setOpen(true);
			const dish = dishes[editModeIndex];
			setDishName(dish?.dishName);
			setCookingTime(dish?.cookingTime);
		}
	}, [editModeIndex]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setDishName(null);
		setCookingTime(null);
		setEditModeIndex(null);
		setDishNameError(null);
		setOpen(false);
	};

	const handleAddDish = () => {
		const currentDishes = dishes ? cloneDeep(dishes) : [];
		currentDishes.push({
			dishName,
			cookingTime,
		});
		setDishes(currentDishes);
		handleClose();
		// const newItemPage = Math.ceil(currentDishes.length / pageSize);
		setSuccess("Dish Added Successfully");
	};

	const handleEditDish = () => {
		const currentDishes = dishes ? cloneDeep(dishes) : [];
		currentDishes[editModeIndex] = {
			dishName,
			cookingTime,
		};
		setDishes(currentDishes);
		handleClose();
		setSuccess("Dish edited successfully");
	};

	return (
		<>
			<Button
				variant="contained"
				onClick={handleClickOpen}
				sx={{ mt: 1, display: "block", mx: "auto" }}
			>
				Add Dish
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>
					{editModeIndex !== null ? "Edit" : "Add"} Dish
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To {editModeIndex !== null ? "edit the" : "add a"} dish,{" "}
						{editModeIndex !== null
							? "make desired changes to the"
							: "add in"}{" "}
						the below fields.
					</DialogContentText>
					<TextField
						value={dishName ?? ""}
						onChange={(event) => {
							let value = capitalize(event.target.value);
							if (dishName && value === "") {
								setDishNameError("Dish name is required");
							} else {
								setDishNameError(null);
							}
							setDishName(value);
						}}
						margin="dense"
						id="Dish Name"
						label="Dish Name"
						type="text"
						fullWidth
						variant="standard"
						error={dishNameError ? true : false}
						helperText={dishNameError}
					/>
					<TextField
						value={cookingTime ?? ""}
						onChange={(event) => {
							let value = event.target.value;
							if (cookingTime && value === "") {
								setCookingTimeError(
									"Dish cooking time is required"
								);
							} else if (parseInt(value) != value) {
								setCookingTimeError(
									"Dish cooking time must be integral"
								);
							} else if (parseInt(value) <= 0) {
								setCookingTimeError(
									"Dish cooking time must be positive"
								);
							} else {
								setCookingTimeError(null);
							}
							setCookingTime(parseInt(value));
						}}
						margin="dense"
						id="Cooking Time"
						label="Cooking Time"
						type="number"
						fullWidth
						variant="standard"
						error={cookingTimeError ? true : false}
						helperText={cookingTimeError}
					/>
				</DialogContent>
				<DialogActions sx={{ m: 2 }}>
					<Button onClick={handleClose}>Cancel</Button>
					<Button
						onClick={
							editModeIndex !== null
								? handleEditDish
								: handleAddDish
						}
						variant="contained"
						disabled={
							!dishName ||
							!cookingTime ||
							dishNameError ||
							cookingTimeError
						}
					>
						{editModeIndex !== null ? "Save Changes" : "Add Dish"}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
