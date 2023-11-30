//This component is imported by the HomeContainer, and is used to display the list of dish names and cooking times added by the user in a tabular format. It also handles user requests pertaining to updating and/or deleting dishes, in conjunction with the Dish and DishInput components, by modifying the dishes state accessed from the stateContext

import { useState, useContext } from "react";
import { dishesContext } from "../context/stateContext";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Dish } from ".";
import { Typography } from "@mui/material";
import { cloneDeep } from "lodash";
export const DishList = ({ setEditModeIndex, setSuccess }) => {
	const { dishes, setDishes } = useContext(dishesContext);

	const [open, setOpen] = useState(false);

	const [deleteIndex, setDeleteIndex] = useState(null);

	//This function handles the edits related to a dish by opening a modal, displaying the current details and asking the user to enter the updated details and to confirm the updates
	const handleEdit = (index) => {
		setEditModeIndex(index);
	};

	//This function handles the deletes related to a dish by opening a dialog box asking for user confirmation to delete the selected dish
	const handleDelete = (index) => {
		setDeleteIndex(index);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setDeleteIndex(null);
	};

	//This function deletes the dish by modifying the dishes state upon user confirmation
	const handleDeleteConfirm = () => {
		const currentDishes = dishes ? cloneDeep(dishes) : [];
		currentDishes.splice(deleteIndex, 1);
		setDishes(currentDishes);
		handleClose();
		setSuccess("Dish deleted successfully");
	};

	return (
		<>
			{dishes?.length > 0 ? (
				<TableContainer
					component={Paper}
					sx={{ maxWidth: 575, mx: "auto", mt: 3 }}
				>
					<Table size="small" aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell sx={{ width: "12%" }}>
									Index
								</TableCell>
								<TableCell>Dish Name</TableCell>
								<TableCell>Cooking Time (minutes)</TableCell>
								<TableCell align="right" sx={{ width: "1%" }} />
							</TableRow>
						</TableHead>
						<TableBody>
							{dishes?.map((dish, index) => (
								<Dish
									key={index.toString()}
									index={index}
									dish={dish}
									handleEdit={handleEdit}
									handleDelete={handleDelete}
								/>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			) : (
				<Typography
					sx={{
						color: "text.secondary",
						textAlign: "center",
						mt: 3,
					}}
				>
					No dishes exist. Add a new dish by tapping on the above
					button.
				</Typography>
			)}

			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					Are you sure you want to delete this dish?
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Confirming to delete will permanently remove the
						following dish ~ <br /> <br />
						<Typography
							sx={{
								fontStyle: "italic",
							}}
						>
							Dish name: {dishes[deleteIndex]?.dishName} <br />
							Cooking Time: {
								dishes[deleteIndex]?.cookingTime
							}{" "}
							<br />
						</Typography>
					</DialogContentText>
				</DialogContent>
				<DialogActions sx={{ m: 2 }}>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleDeleteConfirm} variant="contained">
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
