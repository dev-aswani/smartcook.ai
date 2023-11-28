import { useState } from "react";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";

export const Dish = ({ dish, index, handleEdit, handleDelete }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
	};
	const handleEditClick = () => {
		handleEdit(index);
		handleMenuClose();
	};
	const handleDeleteClick = () => {
		handleDelete(index);
		handleMenuClose();
	};
	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;
	// console.log(typeof dish.cookingTime);
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
