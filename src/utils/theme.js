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
