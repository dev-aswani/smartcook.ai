//This component is imported by SimulatedAnnealingContainer, to dynamically plot the graph pertaining to the simulated annealing algorithm, and display the progress bar using the ProgressBar component.

import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { Paper } from "@mui/material";
import { ProgressBar } from "./ProgressBar";
import { theme } from "../utils";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const SimulatedAnnealingChart = ({ data, progress }) => {
	const options = {
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
