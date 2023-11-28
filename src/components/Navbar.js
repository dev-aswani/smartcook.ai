import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { theme } from "../utils/theme";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
export const Navbar = () => {
	const [currentPage, setCurrentPage] = useState("/");
	const navigate = useNavigate();
	const handleClick = (path) => {
		navigate(`/${path}`);
		setCurrentPage(`/${path}`);
	};
	// console.log(currentPage);
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="static"
				sx={{ backgroundColor: theme.palette.primary.main }}
			>
				<Toolbar>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					>
						SmartCook.ai
					</Typography>
					<Stack direction="row" spacing={1}>
						<Button
							color="inherit"
							onClick={() => handleClick("dishes")}
						>
							Dishes
						</Button>
						<Button
							color="inherit"
							onClick={() => handleClick("logistics")}
						>
							Logistics
						</Button>
						<Button
							color="inherit"
							onClick={() => handleClick("simulated-annealing")}
						>
							Simulated Annealing
						</Button>
						<Button
							color="inherit"
							onClick={() => handleClick("smart-schedule")}
						>
							Smart Schedule
						</Button>
					</Stack>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
