//This component is receives props from the SimulatedAnnealingChart component, which represents the percentage completion at any point within the algorithm's execution and dynamically displays it

import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(props) {
	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Box sx={{ width: "100%", mr: 1 }}>
				<LinearProgress variant="determinate" {...props} />
			</Box>
			<Box sx={{ minWidth: 35 }}>
				<Typography
					variant="body2"
					color="text.secondary"
				>{`${Math.floor(props.value)}%`}</Typography>
			</Box>
		</Box>
	);
}

export const ProgressBar = ({ progress }) => {
	return (
		<Box sx={{ width: "100%" }}>
			<LinearProgressWithLabel value={progress} />
		</Box>
	);
};
