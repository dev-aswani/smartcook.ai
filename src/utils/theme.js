//This file is used to define a custom configuration for the entire React application using Material UI. This theme can be imported and applied across the entire application for consistent

import { deepPurple } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
	typography: {
		fontFamily: "Assistant",
	},
	palette: {
		mode: "dark",
		primary: {
			main: deepPurple["A700"],
		},
	},
});
