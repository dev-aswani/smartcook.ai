//This component is imported at the application level and is rendered across the entire application to facilitate easy naviagtion to different sections in a user friendly manner. This component also highlights the section at which the user currently.

import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { theme } from "../utils/theme";
import { Stack } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
export const Navbar = () => {
	const location = useLocation();

	const [currentPage, setCurrentPage] = useState(location.pathname);

	const navigate = useNavigate();

	// This essentially sets the current page based on the pathname when the component mounts
	useEffect(() => {
		setCurrentPage(location.pathname);
	}, [location.pathname]);

	//This function allows the user to navigate to different sections in the application.
	const handleClick = (path) => {
		navigate(`/${path}`);
		setCurrentPage(`${path}`);
	};

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
							//This function is used to invoke the handleClick function which then navigates to the Dishes section.
							onClick={() => handleClick("dishes")}
							sx={{
								backgroundColor:
									currentPage === "/dishes" ||
									currentPage === "/"
										? theme.palette.primary.light
										: "default",
							}}
						>
							Dishes
						</Button>
						<Button
							color="inherit"
							//This function is used to invoke the handleClick function which then navigates to the Logistics section.
							onClick={() => handleClick("logistics")}
							sx={{
								backgroundColor:
									currentPage === "/logistics"
										? theme.palette.primary.light
										: "default",
							}}
						>
							Logistics
						</Button>
						<Button
							color="inherit"
							//This function is used to invoke the handleClick function which then navigates to the Dishes section.
							onClick={() => handleClick("simulated-annealing")}
							sx={{
								backgroundColor:
									currentPage === "/simulated-annealing"
										? theme.palette.primary.light
										: "default",
							}}
						>
							Simulated Annealing
						</Button>
						<Button
							color="inherit"
							//This function is used to invoke the handleClick function which then navigates to the Smart Schedule section.
							onClick={() => handleClick("smart-schedule")}
							sx={{
								backgroundColor:
									currentPage === "/smart-schedule"
										? theme.palette.primary.light
										: "default",
							}}
						>
							Smart Schedule
						</Button>
					</Stack>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
