//This file is the main component representing the entire application, it imports the necessary pages and renders them based on client side routing

import React from "react";
import { Home, Logistics, SmartSchedule, SimulatedAnnealing } from "./pages";
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
					<Route path="/" element={<Home />}></Route>
					<Route path="/dishes" element={<Home />}></Route>
					<Route path="/logistics" element={<Logistics />}></Route>
					<Route
						path="/simulated-annealing"
						element={<SimulatedAnnealing />}
					></Route>
					<Route
						path="/smart-schedule"
						element={<SmartSchedule />}
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
