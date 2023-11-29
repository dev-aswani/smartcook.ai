//This component accepts props fom the SimulatedAnnealingContainer, including data points corresponding to the simulated annealing algorithm and the percentage completion at any point within the algorithms execution time and dynamically plots the graph and displays the progress bar. It also imports the necessary components to display the progress bar

import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { Paper } from "@mui/material";
import { ProgressBar } from "./ProgressBar";
import { theme } from "../utils";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const SimulatedAnnealingChart = ({ data, progress }) => {
	const options = {
		// title: {
		// 	text: "Dynamic Line Chart",
		// },
		backgroundColor: "transparent",
		data: [
			{
				type: "line",
				dataPoints: data,
				lineColor: theme.palette.primary.main,
			},
		],
		width: 700,
		height: 400,
		axisX: {
			labelFontColor: theme.palette.text.secondary,
			title: "Iteration",
			titleFontColor: theme.palette.primary.light,
		},
		axisY: {
			gridThickness: 0,
			labelFontColor: theme.palette.text.secondary,
			title: "Cooling Time (in minutes)",
			titleFontColor: theme.palette.primary.light,
		},
	};

	return (
		<>
			<ProgressBar progress={progress} />
			<Paper
				elevation={1}
				sx={{ p: 5, mt: 2.5, width: 830, height: 480 }}
			>
				<CanvasJSChart options={options} />
			</Paper>
		</>
	);
};
