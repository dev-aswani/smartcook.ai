import React, { useState, useEffect, useRef } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { Box, Paper } from "@mui/material";
import { ProgressBar } from "./ProgressBar";
import { theme } from "../utils";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const ChartComponent = ({ data, progress }) => {
	const [dps, setDps] = useState([
		{ x: 1, y: 10 },
		{ x: 2, y: 13 },
		{ x: 3, y: 18 },
		{ x: 4, y: 20 },
		{ x: 5, y: 17 },
		{ x: 6, y: 10 },
		{ x: 7, y: 13 },
		{ x: 8, y: 18 },
		{ x: 9, y: 20 },
		{ x: 10, y: 17 },
	]);

	// const xVal = useRef(dps.length + 1);
	// const yVal = useRef(15);

	// const updateInterval = 1000;

	// useEffect(() => {
	// 	const intervalId = setInterval(updateChart, updateInterval);

	// 	return () => clearInterval(intervalId);
	// }, [dps]);

	// const updateChart = () => {
	// 	yVal.current = yVal.current + Math.round(5 + Math.random() * (-5 - 5));
	// 	setDps((prevDps) => [...prevDps, { x: xVal.current, y: yVal.current }]);
	// 	xVal.current++;

	// 	// if (dps.length > 10) {
	// 	// 	setDps((prevDps) => prevDps.slice(1));
	// 	// }
	// };

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
		width: 700, // Set the width explicitly
		height: 400,
		axisX: {
			labelFontColor: theme.palette.text.secondary,
		},
		axisY: {
			gridThickness: 0, // Set gridThickness to 0 to hide horizontal grid lines

			labelFontColor: theme.palette.text.secondary,
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
