import React from "react";
import { HomePage, DetailsPage, ChartPage, SmartSchedulePage } from "./pages";
import { Provider } from "./context/stateContext";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import { Box } from "@mui/material";
function App() {
	return (
		<div className="App">
			<Navbar></Navbar>
			<Box my={3} textAlign={"center"} alignItems={"center"}>
				<Routes>
					<Route path="/" element={<HomePage />}></Route>
					<Route path="/dishes" element={<HomePage />}></Route>
					<Route path="/logistics" element={<DetailsPage />}></Route>
					<Route
						path="/simulated-annealing"
						element={<ChartPage />}
					></Route>
					<Route
						path="/smart-schedule"
						element={<SmartSchedulePage />}
					></Route>
				</Routes>
			</Box>
		</div>
	);
}

export default () => {
	return (
		<Provider>
			<App />
		</Provider>
	);
};
