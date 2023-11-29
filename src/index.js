//This file is basically rendering the React app with routing, styled using Material UI
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import "./index.css";
import { CssBaseline } from "@mui/material";
import { theme } from "./utils/theme";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<ThemeProvider theme={theme}>
			<CssBaseline></CssBaseline>
			<App />
		</ThemeProvider>
	</BrowserRouter>
);
