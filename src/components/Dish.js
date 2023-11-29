//This component is imported by the Dish List component to model and display a dish and handle the requests related to updates and/or deletes in conjunction with DishInput and DishList
import { useState } from "react";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";

export const Dish = ({ dish, index, handleEdit, handleDelete }) => {
	const [anchorEl, setAnchorEl] = useState(null);

	//This handles the user's clicking on the options icon to either edit or delete a dish by displaying those options
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	//This handles the user's clicking elsewhere after clicking on the options by closing the options popover
	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	//This handles the user's request to edit a dish by setting the index of the dish to be edited in its parent component, DishList,  which in turn sets its parent component's editModeIndex state variable which is passed to DishInput which then opens the associated modal, asking the user to enter the updated details of the dish that he wants to edit
	const handleEditClick = () => {
		handleEdit(index);
		handleMenuClose();
	};

	//This handles the user's request to delete a dish by setting the index of the dish to be deleted in its parent component, DishList, which then opens a dialog box requesting user confirmation to proceed with the delete operation, upon which the DishList component deletes the dish by modifying the dishes state stored and maintained in the stateContext
	const handleDeleteClick = () => {
		handleDelete(index);
		handleMenuClose();
	};

	const open = Boolean(anchorEl);

	const id = open ? "simple-popover" : undefined;

	return (
		<TableRow>
			<TableCell
				component="th"
				scope="row"
				sx={{ color: "text.secondary" }}
			>
				{index + 1}
			</TableCell>
			<TableCell sx={{ color: "text.secondary" }}>
				{dish.dishName}
			</TableCell>
			<TableCell sx={{ color: "text.secondary" }}>
				{dish.cookingTime}
			</TableCell>

			<TableCell>
				<IconButton
					aria-label="delete"
					size="small"
					aria-describedby={id}
					variant="contained"
					onClick={handleClick}
				>
					<MoreVertIcon
						fontSize="inherit"
						sx={{ color: "text.secondary" }}
					/>
				</IconButton>
				<Popover
					id={id}
					open={open}
					anchorEl={anchorEl}
					onClose={handleMenuClose}
					anchorOrigin={{
						vertical: "center",
						horizontal: "center",
					}}
				>
					<Button
						variant="text"
						sx={{
							px: 2,
							py: 1,
							width: "100%",
							color: "text.secondary",
							fontSize: "0.7rem",
						}}
						onClick={handleEditClick}
					>
						Edit
					</Button>
					<br />
					<Button
						variant="text"
						sx={{
							px: 2,
							py: 1,
							width: "100%",
							color: "text.secondary",
							fontSize: "0.7rem",
						}}
						onClick={handleDeleteClick}
					>
						Delete
					</Button>
				</Popover>
			</TableCell>
		</TableRow>
	);
};
